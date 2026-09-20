"""
Backend tests verifying newly-added root-level probe endpoints and regression of /api/* routes.

Covers:
- GET /health           (root, for Kubernetes probes) -> 200 {"status":"ok"}
- GET /                 (root) -> 200 {"service":"Sollmarine API", ...}
- Regression: /api/ , /api/reservations POST, /api/orders POST, /api/telegram/test POST
- Static: /api/static/menu/salads/01.jpg -> 200
- HTTP/1.0 request against /health via raw socket (Kubernetes probes use HTTP/1.0)
"""
import os
import socket
import ssl
from pathlib import Path
from urllib.parse import urlparse

import pytest
import requests


BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    fe_env = Path("/app/frontend/.env")
    if fe_env.exists():
        for line in fe_env.read_text().splitlines():
            if line.startswith("EXPO_PUBLIC_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().strip('"').rstrip("/")
                break
assert BASE_URL, "EXPO_PUBLIC_BACKEND_URL is required"

# Also test against the internal port 8001 because Kubernetes probes hit the pod
# directly (not through the ingress). If the route isn't registered on the app
# itself, the ingress may hide the 404.
INTERNAL_URL = "http://127.0.0.1:8001"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- 1. Root health endpoints (the fix) ----------
#
# NOTE: The public/ingress URL routes non-/api/* traffic to the Expo web frontend
# (port 3000). Kubernetes readiness/liveness probes hit the pod DIRECTLY on port
# 8001 (INTERNAL_URL), which is what these tests validate. The 404 from
# {BASE_URL}/health that the deployment agent saw was from a probe hitting the
# backend container directly — that is exactly what this fix must resolve.
class TestRootHealthEndpoints:
    def test_health_internal_port(self, api):
        r = api.get(f"{INTERNAL_URL}/health")
        assert r.status_code == 200, r.text
        assert r.json() == {"status": "ok"}
        assert r.headers.get("content-type", "").startswith("application/json")

    def test_root_internal_port(self, api):
        r = api.get(f"{INTERNAL_URL}/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("service") == "Sollmarine API"
        assert data.get("status") == "ok"

    def test_health_public_url_is_frontend_by_design(self, api):
        """Ingress sends non-/api paths to Expo web; this is expected behaviour and
        NOT what Kubernetes probes use. We assert this so future edits don't
        accidentally believe /health must be public."""
        r = api.get(f"{BASE_URL}/health")
        # Either the Expo web frontend responds (200 HTML) or a 404 — but never
        # our JSON body, because /health on the backend is only reachable via
        # the internal port.
        assert r.status_code in (200, 404)
        assert "application/json" not in r.headers.get("content-type", "").lower() or \
               r.json() != {"status": "ok"}


# ---------- 2. HTTP/1.0 probe (raw socket) ----------
class TestHealthHttp10:
    """
    Kubernetes readiness/liveness probes are known to send HTTP/1.0 requests.
    Verify FastAPI/uvicorn serves them correctly on the internal port.
    """

    def test_health_http10_internal(self):
        req = b"GET /health HTTP/1.0\r\nHost: 127.0.0.1\r\n\r\n"
        with socket.create_connection(("127.0.0.1", 8001), timeout=5) as s:
            s.sendall(req)
            chunks = []
            while True:
                data = s.recv(4096)
                if not data:
                    break
                chunks.append(data)
        raw = b"".join(chunks).decode(errors="ignore")
        status_line = raw.split("\r\n", 1)[0]
        assert "200" in status_line, f"HTTP/1.0 status line: {status_line!r}\nfull:\n{raw}"
        assert '"status":"ok"' in raw.replace(" ", ""), raw

    def test_root_http10_internal(self):
        req = b"GET / HTTP/1.0\r\nHost: 127.0.0.1\r\n\r\n"
        with socket.create_connection(("127.0.0.1", 8001), timeout=5) as s:
            s.sendall(req)
            chunks = []
            while True:
                data = s.recv(4096)
                if not data:
                    break
                chunks.append(data)
        raw = b"".join(chunks).decode(errors="ignore")
        status_line = raw.split("\r\n", 1)[0]
        assert "200" in status_line, f"HTTP/1.0 status line: {status_line!r}\nfull:\n{raw}"
        assert "Sollmarine API" in raw, raw


# ---------- 3. Regression: /api/* still works ----------
class TestApiRegression:
    def test_api_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("service") == "Sollmarine API"
        assert data.get("telegram_configured") is True

    def test_create_reservation(self, api):
        payload = {
            "name": "TEST_health_regression Res",
            "phone": "+7 700 000 00 00",
            "email": "test-health-res@example.com",
            "guests": 2,
            "date": "2026-02-20",
            "time": "20:00",
            "note": "regression after /health fix",
        }
        r = api.post(f"{BASE_URL}/api/reservations", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["guests"] == 2
        assert data["id"]

    def test_create_order(self, api):
        payload = {
            "name": "TEST_health_regression Order",
            "phone": "+7 700 111 22 33",
            "address": "Актау, регресс-тест",
            "items": [
                {"id": "sku-1", "name": "Осетр стейк", "price": 5400, "quantity": 1},
            ],
            "total": 5400,
            "comment": "regression after /health fix",
        }
        r = api.post(f"{BASE_URL}/api/orders", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["total"] == 5400
        assert len(data["items"]) == 1
        assert data["id"]

    def test_telegram_test(self, api):
        r = api.post(f"{BASE_URL}/api/telegram/test")
        assert r.status_code == 200, r.text
        assert r.json().get("sent") is True


# ---------- 4. Static files still mounted ----------
class TestStaticMount:
    def test_static_salad_image(self, api):
        r = api.get(f"{BASE_URL}/api/static/menu/salads/01.jpg")
        assert r.status_code == 200, f"status={r.status_code}, body[:200]={r.text[:200]}"
        assert r.headers.get("content-type", "").startswith("image/"), r.headers
        assert len(r.content) > 100
