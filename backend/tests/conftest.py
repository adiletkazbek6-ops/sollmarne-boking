import os
from pathlib import Path

# Ensure EXPO_PUBLIC_BACKEND_URL is available inside pytest process
if not os.environ.get("EXPO_PUBLIC_BACKEND_URL"):
    fe = Path("/app/frontend/.env")
    if fe.exists():
        for line in fe.read_text().splitlines():
            if line.startswith("EXPO_PUBLIC_BACKEND_URL="):
                os.environ["EXPO_PUBLIC_BACKEND_URL"] = (
                    line.split("=", 1)[1].strip().strip('"')
                )
                break
