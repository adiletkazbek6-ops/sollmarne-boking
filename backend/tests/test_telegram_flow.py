"""
Backend tests for Sollmarine — verifies Telegram integration on:
- GET /api/  (service health + telegram_configured flag)
- POST /api/telegram/test  (proves Bot Token + Chat ID are valid via real Telegram API)
- POST /api/reservations  (background Telegram notify)
- POST /api/orders        (background Telegram notify)

Also scans backend logs after each POST for Telegram-related WARNING/ERROR lines.
"""
import os
import time
import pytest
import requests
from datetime import datetime
from pathlib import Path

# Marker captured at import time — used to ignore historical log lines
RUN_START_TS = datetime.now()

BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fall back to frontend .env
    fe_env = Path("/app/frontend/.env")
    if fe_env.exists():
        for line in fe_env.read_text().splitlines():
            if line.startswith("EXPO_PUBLIC_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().strip('"').rstrip("/")
                break

assert BASE_URL, "EXPO_PUBLIC_BACKEND_URL is required"

BACKEND_LOG_ERR = "/var/log/supervisor/backend.err.log"
BACKEND_LOG_OUT = "/var/log/supervisor/backend.out.log"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _tail_logs(n_bytes: int = 20000) -> str:
    """Return last N bytes of the two backend logs concatenated."""
    chunks = []
    for path in (BACKEND_LOG_ERR, BACKEND_LOG_OUT):
        try:
            with open(path, "rb") as f:
                f.seek(0, os.SEEK_END)
                size = f.tell()
                f.seek(max(0, size - n_bytes))
                chunks.append(f"===== {path} =====\n" + f.read().decode(errors="ignore"))
        except FileNotFoundError:
            pass
    return "\n".join(chunks)


def _read_logs_since_run() -> str:
    """Return backend log lines whose timestamp is >= RUN_START_TS."""
    import re

    ts_re = re.compile(r"^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})")
    out_lines = []
    for path in (BACKEND_LOG_ERR, BACKEND_LOG_OUT):
        try:
            with open(path, "r", errors="ignore") as f:
                lines = f.readlines()
        except FileNotFoundError:
            continue
        include = False
        for line in lines:
            m = ts_re.match(line)
            if m:
                try:
                    line_ts = datetime.strptime(m.group(1), "%Y-%m-%d %H:%M:%S")
                    include = line_ts >= RUN_START_TS.replace(microsecond=0)
                except ValueError:
                    pass
            if include:
                out_lines.append(line)
    return "".join(out_lines)


def _assert_no_telegram_failure_in_logs():
    """Fail if backend logs SINCE THIS TEST RUN contain Telegram errors/warnings."""
    logs = _read_logs_since_run()
    bad_markers = [
        "Telegram API error",
        "Telegram send failed",
        "Telegram not configured",
    ]
    hits = [m for m in bad_markers if m in logs]
    assert not hits, (
        f"Telegram failure markers found in current-run backend logs: {hits}\n"
        f"---CURRENT-RUN LOG---\n{logs[-4000:]}"
    )


# ---------- 1. Health / config ----------
class TestServiceHealth:
    def test_root_ok_and_telegram_configured(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("service") == "Sollmarine API"
        assert data.get("status") == "ok"
        assert data.get("telegram_configured") is True, (
            "telegram_configured is False — env vars TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not loaded"
        )


# ---------- 2. Telegram credentials verification (real API) ----------
class TestTelegramTestEndpoint:
    def test_telegram_test_returns_sent_true(self, api):
        r = api.post(f"{BASE_URL}/api/telegram/test")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("sent") is True, (
            f"Telegram /test returned sent={data.get('sent')} — token or chat_id invalid. "
            "This directly proves Telegram will NOT receive booking/order notifications."
        )


# ---------- 3. Reservation → Telegram notify ----------
class TestReservationTelegramNotify:
    created_id: str = ""

    def test_create_reservation_success(self, api):
        payload = {
            "name": "TEST_Reservation Автотест",
            "phone": "+7 700 000 00 00",
            "email": "test-res@example.com",
            "guests": 2,
            "date": "2026-02-14",
            "time": "19:30",
            "note": "Автотест уведомления TG — бронь",
        }
        r = api.post(f"{BASE_URL}/api/reservations", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["guests"] == 2
        assert data["id"]
        TestReservationTelegramNotify.created_id = data["id"]

    def test_reservation_persisted_via_get(self, api):
        assert TestReservationTelegramNotify.created_id, "no id from previous test"
        r = api.get(f"{BASE_URL}/api/reservations")
        assert r.status_code == 200, r.text
        ids = [it["id"] for it in r.json()]
        assert TestReservationTelegramNotify.created_id in ids

    def test_no_telegram_errors_after_reservation(self, api):
        # Wait for background task to run and log httpx call
        time.sleep(4)
        _assert_no_telegram_failure_in_logs()


# ---------- 4. Order → Telegram notify ----------
class TestOrderTelegramNotify:
    created_id: str = ""

    def test_create_order_success(self, api):
        payload = {
            "name": "TEST_Order Автотест",
            "phone": "+7 700 111 22 33",
            "address": "Актау, 15 мкр, дом 1",
            "items": [
                {"id": "sku-1", "name": "Осетр стейк", "price": 5400, "quantity": 2},
                {"id": "sku-2", "name": "Королевские креветки", "price": 3200, "quantity": 1},
            ],
            "total": 14000,
            "comment": "Автотест TG — заказ",
        }
        r = api.post(f"{BASE_URL}/api/orders", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["total"] == 14000
        assert len(data["items"]) == 2
        assert data["id"]
        TestOrderTelegramNotify.created_id = data["id"]

    def test_order_persisted_via_get(self, api):
        assert TestOrderTelegramNotify.created_id, "no id from previous test"
        r = api.get(f"{BASE_URL}/api/orders")
        assert r.status_code == 200, r.text
        ids = [it["id"] for it in r.json()]
        assert TestOrderTelegramNotify.created_id in ids

    def test_empty_cart_rejected(self, api):
        payload = {
            "name": "TEST_x",
            "phone": "+7 700 111 22 33",
            "address": "x",
            "items": [],
            "total": 0,
        }
        r = api.post(f"{BASE_URL}/api/orders", json=payload)
        assert r.status_code == 400, r.text

    def test_no_telegram_errors_after_order(self, api):
        time.sleep(4)
        _assert_no_telegram_failure_in_logs()


# ---------- 5. Direct evidence: httpx call to api.telegram.org logged as 200 ----------
class TestBackendLogsShowTelegramSuccess:
    def test_httpx_telegram_200_present_in_logs(self):
        logs = _read_logs_since_run()
        # httpx logs like:
        # HTTP Request: POST https://api.telegram.org/bot.../sendMessage "HTTP/1.1 200 OK"
        assert "api.telegram.org" in logs, (
            "No httpx call to api.telegram.org found in current-run logs — "
            "background notify may not be running.\n" + logs[-2000:]
        )
        # Count 200 OKs to Telegram in this run
        successful = logs.count("api.telegram.org")
        # /telegram/test + reservation + order = at least 3 outbound calls
        assert successful >= 3, (
            f"Expected >=3 Telegram API calls in current run, found {successful}.\n"
            + logs[-2000:]
        )
        assert 'HTTP/1.1 200 OK"' in logs, (
            "No 200 OK response from Telegram in current-run logs.\n" + logs[-2000:]
        )
