from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, Header, Request, Response
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Telegram config (optional). If not set, notifications are silently skipped.
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "").strip()

# Emergent Managed Google Auth endpoint
EMERGENT_AUTH_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
SESSION_TTL_DAYS = 7

app = FastAPI(title="Sollmarine API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
# Avoid leaking bot token in httpx INFO logs (URL contains it)
logging.getLogger("httpx").setLevel(logging.WARNING)


# ---------- Models ----------
class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    guests: int
    date: str
    time: str
    note: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReservationCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    guests: int = Field(ge=1, le=30)
    date: str
    time: str
    note: Optional[str] = None


class OrderItem(BaseModel):
    id: str
    name: str
    price: float
    quantity: int


class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    address: str
    items: List[OrderItem]
    total: float
    comment: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class OrderCreate(BaseModel):
    name: str
    phone: str
    address: str
    items: List[OrderItem]
    total: float
    comment: Optional[str] = None


# ---------- Telegram notifications ----------
async def send_telegram_message(text: str) -> bool:
    """Send a plain-HTML message to the configured admin chat. Returns True if sent."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.info("Telegram not configured — skipping notification")
        return False
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    try:
        async with httpx.AsyncClient(timeout=10.0) as http:
            resp = await http.post(url, json=payload)
            if resp.status_code != 200:
                logger.warning("Telegram API error %s: %s", resp.status_code, resp.text)
                return False
            return True
    except Exception as e:
        logger.exception("Telegram send failed: %s", e)
        return False


def _esc(v) -> str:
    """Lightweight HTML escape for Telegram parse_mode=HTML."""
    if v is None:
        return ""
    return (
        str(v)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


async def notify_new_reservation(r: Reservation) -> None:
    text = (
        "🍽 <b>Новое бронирование — Sollmarine</b>\n\n"
        f"<b>Имя:</b> {_esc(r.name)}\n"
        f"<b>Телефон:</b> {_esc(r.phone)}\n"
        f"<b>Email:</b> {_esc(r.email) or '—'}\n"
        f"<b>Гостей:</b> {_esc(r.guests)}\n"
        f"<b>Дата:</b> {_esc(r.date)} в {_esc(r.time)}\n"
        f"<b>Комментарий:</b> {_esc(r.note) or '—'}\n\n"
        f"<i>ID: {_esc(r.id)}</i>"
    )
    await send_telegram_message(text)


async def notify_new_order(o: Order) -> None:
    items_lines = "\n".join(
        f"• {_esc(i.name)} × {i.quantity} — {int(i.price * i.quantity):,} ₽".replace(",", " ")
        for i in o.items
    )
    text = (
        "🛵 <b>Новый заказ доставки — Sollmarine</b>\n\n"
        f"<b>Имя:</b> {_esc(o.name)}\n"
        f"<b>Телефон:</b> {_esc(o.phone)}\n"
        f"<b>Адрес:</b> {_esc(o.address)}\n"
        f"<b>Комментарий:</b> {_esc(o.comment) or '—'}\n\n"
        f"<b>Состав заказа:</b>\n{items_lines}\n\n"
        f"<b>Итого: {int(o.total):,} ₽</b>".replace(",", " ") + "\n\n"
        f"<i>ID: {_esc(o.id)}</i>"
    )
    await send_telegram_message(text)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {
        "service": "Sollmarine API",
        "status": "ok",
        "telegram_configured": bool(TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID),
    }


@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(payload: ReservationCreate, background: BackgroundTasks):
    reservation = Reservation(**payload.dict())
    doc = reservation.dict()
    await db.reservations.insert_one(doc)
    background.add_task(notify_new_reservation, reservation)
    return reservation


@api_router.get("/reservations", response_model=List[Reservation])
async def list_reservations():
    items = await db.reservations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate, background: BackgroundTasks):
    if not payload.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    order = Order(**payload.dict())
    doc = order.dict()
    await db.orders.insert_one(doc)
    background.add_task(notify_new_order, order)
    return order


@api_router.get("/orders", response_model=List[Order])
async def list_orders():
    items = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.post("/telegram/test")
async def telegram_test():
    """Helper endpoint to verify Telegram credentials end-to-end."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        raise HTTPException(status_code=400, detail="Telegram is not configured")
    ok = await send_telegram_message(
        "✅ <b>Sollmarine</b> — тестовое уведомление. Связь с админом установлена."
    )
    return {"sent": ok}


# ---------- Auth (Emergent-managed Google Sign-In) ----------
class SessionRequest(BaseModel):
    session_id: str


async def _get_session_user(session_token: str) -> Optional[dict]:
    """Look up a stored session by its token, refresh last-seen, return user data or None."""
    if not session_token:
        return None
    session = await db.sessions.find_one({"session_token": session_token})
    if not session:
        return None
    exp = session.get("expires_at")
    if exp and isinstance(exp, datetime):
        if exp.tzinfo is None:
            exp = exp.replace(tzinfo=timezone.utc)
        if exp < datetime.now(timezone.utc):
            await db.sessions.delete_one({"session_token": session_token})
            return None
    return {
        "id": session.get("user_id"),
        "email": session.get("email"),
        "name": session.get("name"),
        "picture": session.get("picture"),
    }


def _extract_session_token(request: Request, authorization: Optional[str]) -> Optional[str]:
    if authorization and authorization.lower().startswith("bearer "):
        tok = authorization[7:].strip()
        if tok:
            return tok
    cookie_tok = request.cookies.get("session_token")
    return cookie_tok or None


@api_router.post("/auth/session")
async def auth_session(payload: SessionRequest, response: Response):
    """Exchange Emergent session_id (from callback URL hash) for a persisted session.
    Emergent responds with { id, email, name, picture, session_token }.
    We store the mapping in Mongo and set an HttpOnly cookie for the browser.
    """
    if not payload.session_id or len(payload.session_id) < 8:
        raise HTTPException(status_code=400, detail="Invalid session_id")
    try:
        async with httpx.AsyncClient(timeout=10.0) as http:
            resp = await http.get(
                EMERGENT_AUTH_SESSION_URL,
                headers={"X-Session-ID": payload.session_id},
            )
    except Exception as e:
        logger.exception("Emergent auth request failed: %s", e)
        raise HTTPException(status_code=502, detail="Auth provider unreachable")
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid or expired session_id")
    data = resp.json()
    email = (data.get("email") or "").strip().lower()
    session_token = data.get("session_token") or ""
    if not email or not session_token:
        raise HTTPException(status_code=502, detail="Auth provider returned incomplete data")

    user_id = data.get("id") or str(uuid.uuid4())
    name = data.get("name") or email.split("@")[0]
    picture = data.get("picture") or None
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(days=SESSION_TTL_DAYS)

    # Upsert user
    await db.users.update_one(
        {"email": email},
        {
            "$set": {"id": user_id, "email": email, "name": name, "picture": picture, "updated_at": now},
            "$setOnInsert": {"created_at": now},
        },
        upsert=True,
    )
    # Save session
    await db.sessions.update_one(
        {"session_token": session_token},
        {
            "$set": {
                "session_token": session_token,
                "user_id": user_id,
                "email": email,
                "name": name,
                "picture": picture,
                "expires_at": expires_at,
                "updated_at": now,
            },
            "$setOnInsert": {"created_at": now},
        },
        upsert=True,
    )
    # Set cookie for cross-site preview (SameSite=None; Secure)
    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=SESSION_TTL_DAYS * 24 * 3600,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    return {"id": user_id, "email": email, "name": name, "picture": picture, "session_token": session_token}


@api_router.get("/auth/me")
async def auth_me(request: Request, authorization: Optional[str] = Header(default=None)):
    tok = _extract_session_token(request, authorization)
    user = await _get_session_user(tok or "")
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response, authorization: Optional[str] = Header(default=None)):
    tok = _extract_session_token(request, authorization)
    if tok:
        await db.sessions.delete_one({"session_token": tok})
    response.delete_cookie(key="session_token", path="/")
    return {"ok": True}


app.include_router(api_router)


@app.get("/health")
async def health():
    """Root-level health check for Kubernetes probes."""
    return {"status": "ok"}


@app.get("/")
async def root_status():
    return {"service": "Sollmarine API", "status": "ok"}


# Serve uploaded menu photos as static under /api/static/*
_static_dir = ROOT_DIR / "static"
_static_dir.mkdir(exist_ok=True)
app.mount("/api/static", StaticFiles(directory=str(_static_dir)), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
