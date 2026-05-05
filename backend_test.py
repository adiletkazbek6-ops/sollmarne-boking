"""
Backend API tests for Sollmarine FastAPI backend.
Tests run against the public URL configured in /app/frontend/.env (EXPO_PUBLIC_BACKEND_URL).
All API routes are prefixed with /api.
"""
import os
import re
import sys
import json
import time
from datetime import datetime
from pathlib import Path

import requests


def load_backend_url() -> str:
    env_path = Path("/app/frontend/.env")
    url = None
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if line.startswith("EXPO_PUBLIC_BACKEND_URL="):
            url = line.split("=", 1)[1].strip().strip('"').strip("'")
            break
    if not url:
        raise RuntimeError("EXPO_PUBLIC_BACKEND_URL not found in /app/frontend/.env")
    return url.rstrip("/")


BASE_URL = load_backend_url()
API = f"{BASE_URL}/api"

results = []


def record(name: str, ok: bool, detail: str = "") -> None:
    status = "PASS" if ok else "FAIL"
    print(f"[{status}] {name} — {detail}")
    results.append({"name": name, "ok": ok, "detail": detail})


def iso_utc(s: str) -> bool:
    """Check that created_at is parseable ISO and in UTC (ends with Z or +00:00 or naive UTC)."""
    try:
        # Python datetime.fromisoformat supports offsets from 3.11+
        # Replace trailing Z manually for broader compatibility.
        s2 = s.replace("Z", "+00:00") if s.endswith("Z") else s
        dt = datetime.fromisoformat(s2)
    except Exception as e:
        return False
    if dt.tzinfo is None:
        # Naive — treat as UTC acceptable
        return True
    offset = dt.utcoffset()
    return offset is not None and offset.total_seconds() == 0


# ---------------------------------------------------------------------------
# 1. GET /api/  (root health)
# ---------------------------------------------------------------------------
def test_root():
    try:
        r = requests.get(f"{API}/", timeout=15)
        if r.status_code != 200:
            return record("GET /api/ returns 200", False, f"status={r.status_code}, body={r.text[:200]}")
        data = r.json()
        expected = {"service": "Sollmarine API", "status": "ok", "telegram_configured": False}
        ok = data == expected
        record("GET /api/ returns expected payload", ok, f"got={data}")
    except Exception as e:
        record("GET /api/ returns 200", False, f"exception: {e}")


# ---------------------------------------------------------------------------
# 2. POST /api/reservations valid
# ---------------------------------------------------------------------------
created_reservation_id = None

def test_create_reservation_valid():
    global created_reservation_id
    payload = {
        "name": "Иван",
        "phone": "+79991234567",
        "email": "ivan@example.com",
        "guests": 4,
        "date": "2026-03-15",
        "time": "19:00",
        "note": "Окно с видом",
    }
    t0 = time.time()
    try:
        r = requests.post(f"{API}/reservations", json=payload, timeout=15)
        dt = time.time() - t0
    except Exception as e:
        return record("POST /api/reservations (valid)", False, f"exception: {e}")

    if r.status_code != 200:
        return record("POST /api/reservations (valid)", False, f"status={r.status_code}, body={r.text[:300]}")
    data = r.json()
    uuid_re = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
    checks = {
        "id is UUID": bool(uuid_re.match(str(data.get("id", "")))),
        "name echoed": data.get("name") == payload["name"],
        "phone echoed": data.get("phone") == payload["phone"],
        "email echoed": data.get("email") == payload["email"],
        "guests echoed": data.get("guests") == payload["guests"],
        "date echoed": data.get("date") == payload["date"],
        "time echoed": data.get("time") == payload["time"],
        "note echoed": data.get("note") == payload["note"],
        "created_at ISO UTC": iso_utc(str(data.get("created_at", ""))),
        "response time < 5s (no hang)": dt < 5.0,
    }
    failed = [k for k, v in checks.items() if not v]
    ok = not failed
    if ok:
        created_reservation_id = data["id"]
    record(
        "POST /api/reservations (valid)",
        ok,
        f"time={dt:.2f}s; checks_failed={failed}; resp={json.dumps(data)[:300]}",
    )


# ---------------------------------------------------------------------------
# 3-5. Invalid reservations
# ---------------------------------------------------------------------------
def test_reservation_guests_zero():
    payload = {
        "name": "Иван", "phone": "+79991234567", "email": "ivan@example.com",
        "guests": 0, "date": "2026-03-15", "time": "19:00", "note": "n",
    }
    r = requests.post(f"{API}/reservations", json=payload, timeout=15)
    ok = r.status_code == 422
    record("POST /api/reservations guests=0 -> 422", ok, f"status={r.status_code}, body={r.text[:200]}")


def test_reservation_guests_31():
    payload = {
        "name": "Иван", "phone": "+79991234567", "email": "ivan@example.com",
        "guests": 31, "date": "2026-03-15", "time": "19:00", "note": "n",
    }
    r = requests.post(f"{API}/reservations", json=payload, timeout=15)
    ok = r.status_code == 422
    record("POST /api/reservations guests=31 -> 422", ok, f"status={r.status_code}, body={r.text[:200]}")


def test_reservation_missing_phone():
    payload = {
        "name": "Иван", "email": "ivan@example.com",
        "guests": 2, "date": "2026-03-15", "time": "19:00",
    }
    r = requests.post(f"{API}/reservations", json=payload, timeout=15)
    ok = r.status_code == 422
    record("POST /api/reservations missing phone -> 422", ok, f"status={r.status_code}, body={r.text[:200]}")


# ---------------------------------------------------------------------------
# 6. GET /api/reservations
# ---------------------------------------------------------------------------
def test_list_reservations():
    r = requests.get(f"{API}/reservations", timeout=15)
    if r.status_code != 200:
        return record("GET /api/reservations returns 200 list", False, f"status={r.status_code}")
    data = r.json()
    if not isinstance(data, list):
        return record("GET /api/reservations returns 200 list", False, f"not a list: {type(data)}")

    # Check latest-first ordering (if >= 2 items)
    ordering_ok = True
    if len(data) >= 2:
        try:
            ts = [datetime.fromisoformat(str(x.get("created_at")).replace("Z", "+00:00")) for x in data]
            for i in range(len(ts) - 1):
                if ts[i] < ts[i + 1]:
                    ordering_ok = False
                    break
        except Exception:
            ordering_ok = False

    # If we just created a reservation, it should be at index 0
    first_is_new = True
    if created_reservation_id:
        first_is_new = len(data) > 0 and data[0].get("id") == created_reservation_id

    ok = ordering_ok and first_is_new
    record(
        "GET /api/reservations returns list (latest first)",
        ok,
        f"count={len(data)}, ordering_ok={ordering_ok}, first_is_new={first_is_new}",
    )


# ---------------------------------------------------------------------------
# 7. POST /api/orders valid
# ---------------------------------------------------------------------------
created_order_id = None

def test_create_order_valid():
    global created_order_id
    payload = {
        "name": "Анна",
        "phone": "+79995554433",
        "address": "Москва, ул. Ленина 1",
        "items": [{"id": "s1", "name": "Устрицы", "price": 2490, "quantity": 2}],
        "total": 4980,
        "comment": "Без льда",
    }
    t0 = time.time()
    try:
        r = requests.post(f"{API}/orders", json=payload, timeout=15)
        dt = time.time() - t0
    except Exception as e:
        return record("POST /api/orders (valid)", False, f"exception: {e}")

    if r.status_code != 200:
        return record("POST /api/orders (valid)", False, f"status={r.status_code}, body={r.text[:300]}")
    data = r.json()
    uuid_re = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
    items = data.get("items", [])
    checks = {
        "id is UUID": bool(uuid_re.match(str(data.get("id", "")))),
        "name echoed": data.get("name") == payload["name"],
        "phone echoed": data.get("phone") == payload["phone"],
        "address echoed": data.get("address") == payload["address"],
        "items len": len(items) == 1,
        "item name": items and items[0].get("name") == "Устрицы",
        "item price": items and items[0].get("price") == 2490,
        "item qty": items and items[0].get("quantity") == 2,
        "total echoed": data.get("total") == payload["total"],
        "comment echoed": data.get("comment") == payload["comment"],
        "created_at ISO UTC": iso_utc(str(data.get("created_at", ""))),
        "response time < 5s": dt < 5.0,
    }
    failed = [k for k, v in checks.items() if not v]
    ok = not failed
    if ok:
        created_order_id = data["id"]
    record("POST /api/orders (valid)", ok, f"time={dt:.2f}s; failed={failed}; resp={json.dumps(data)[:400]}")


# ---------------------------------------------------------------------------
# 8. POST /api/orders empty items
# ---------------------------------------------------------------------------
def test_order_empty_items():
    payload = {
        "name": "Анна", "phone": "+79995554433", "address": "Москва",
        "items": [], "total": 0, "comment": "",
    }
    r = requests.post(f"{API}/orders", json=payload, timeout=15)
    if r.status_code != 400:
        return record("POST /api/orders empty items -> 400", False, f"status={r.status_code}, body={r.text[:200]}")
    try:
        body = r.json()
    except Exception:
        return record("POST /api/orders empty items -> 400", False, f"non-JSON body: {r.text[:200]}")
    ok = body.get("detail") == "Cart is empty"
    record("POST /api/orders empty items -> 400 'Cart is empty'", ok, f"body={body}")


# ---------------------------------------------------------------------------
# 9. GET /api/orders
# ---------------------------------------------------------------------------
def test_list_orders():
    r = requests.get(f"{API}/orders", timeout=15)
    if r.status_code != 200:
        return record("GET /api/orders returns 200 list", False, f"status={r.status_code}")
    data = r.json()
    if not isinstance(data, list):
        return record("GET /api/orders returns 200 list", False, f"not a list: {type(data)}")
    first_is_new = True
    if created_order_id:
        first_is_new = len(data) > 0 and data[0].get("id") == created_order_id
    record("GET /api/orders returns list (latest first)", first_is_new,
           f"count={len(data)}, first_is_new={first_is_new}")


# ---------------------------------------------------------------------------
# 10. POST /api/telegram/test without config
# ---------------------------------------------------------------------------
def test_telegram_not_configured():
    r = requests.post(f"{API}/telegram/test", timeout=15)
    if r.status_code != 400:
        return record("POST /api/telegram/test -> 400 (not configured)", False,
                      f"status={r.status_code}, body={r.text[:200]}")
    try:
        body = r.json()
    except Exception:
        return record("POST /api/telegram/test -> 400 (not configured)", False, f"body={r.text[:200]}")
    ok = body.get("detail") == "Telegram is not configured"
    record("POST /api/telegram/test -> 400 'Telegram is not configured'", ok, f"body={body}")


# ---------------------------------------------------------------------------
# 11. Backend logs sanity check
# ---------------------------------------------------------------------------
def test_backend_logs_no_exceptions():
    # Give background tasks a moment to execute
    time.sleep(2)
    log_paths = [
        "/var/log/supervisor/backend.err.log",
        "/var/log/supervisor/backend.out.log",
    ]
    problematic = []
    info_skip_seen = False
    for p in log_paths:
        try:
            with open(p, "r") as f:
                # read last ~20KB
                f.seek(0, 2)
                size = f.tell()
                f.seek(max(0, size - 20000))
                content = f.read()
        except FileNotFoundError:
            continue
        if "Telegram not configured — skipping notification" in content:
            info_skip_seen = True
        # Hunt for Python tracebacks/ERROR lines related to Telegram or our endpoints
        for marker in ("Traceback (most recent call last):", "Telegram send failed", "ERROR"):
            if marker in content:
                # Collect a few lines around it
                idx = content.rfind(marker)
                snippet = content[max(0, idx - 100): idx + 400]
                # Allow typical benign MongoDB/uvicorn boot messages; but flag anything else
                if marker == "ERROR" and ("asyncio" not in snippet and "HTTPException" not in snippet):
                    # Record ERROR lines that don't relate to normal HTTPException responses
                    problematic.append((p, marker, snippet[:300]))
                elif marker != "ERROR":
                    problematic.append((p, marker, snippet[:300]))
    ok = len(problematic) == 0
    record(
        "Backend logs: no Python exceptions during reservation/order creation",
        ok,
        f"info_skip_seen={info_skip_seen}; problematic={problematic if problematic else 'none'}",
    )


def main():
    print(f"Testing against: {API}")
    test_root()
    test_create_reservation_valid()
    test_reservation_guests_zero()
    test_reservation_guests_31()
    test_reservation_missing_phone()
    test_list_reservations()
    test_create_order_valid()
    test_order_empty_items()
    test_list_orders()
    test_telegram_not_configured()
    test_backend_logs_no_exceptions()

    print("\n===== SUMMARY =====")
    passed = sum(1 for x in results if x["ok"])
    failed = [x for x in results if not x["ok"]]
    print(f"Passed: {passed}/{len(results)}")
    for f in failed:
        print(f"  FAIL: {f['name']} — {f['detail']}")
    return 0 if not failed else 1


if __name__ == "__main__":
    sys.exit(main())
