import time

# Minimal in-memory per-IP cooldown, no external dependency (Redis, etc.)
# needed for a personal-portfolio contact form. Not shared across worker
# processes -- fine at this scale, but note that if this is ever deployed
# behind multiple uvicorn/gunicorn workers, each process gets its own copy.
_last_submission_by_ip: dict[str, float] = {}
_last_ask_by_ip: dict[str, float] = {}
_ask_timestamps_by_ip: dict[str, list[float]] = {}

COOLDOWN_SECONDS = 15
ASK_COOLDOWN_SECONDS = 4

# hard cap on top of the cooldown: bounds total OpenAI spend per visitor even
# if someone scripts around the per-request cooldown
ASK_HOURLY_LIMIT = 20
ASK_HOURLY_WINDOW_SECONDS = 3600


def is_rate_limited(client_ip: str) -> bool:
    now = time.monotonic()
    last = _last_submission_by_ip.get(client_ip)
    if last is not None and now - last < COOLDOWN_SECONDS:
        return True
    _last_submission_by_ip[client_ip] = now
    return False


def is_ask_rate_limited(client_ip: str) -> bool:
    now = time.monotonic()

    last = _last_ask_by_ip.get(client_ip)
    if last is not None and now - last < ASK_COOLDOWN_SECONDS:
        return True

    timestamps = [t for t in _ask_timestamps_by_ip.get(client_ip, []) if now - t < ASK_HOURLY_WINDOW_SECONDS]
    if len(timestamps) >= ASK_HOURLY_LIMIT:
        _ask_timestamps_by_ip[client_ip] = timestamps
        return True

    timestamps.append(now)
    _ask_timestamps_by_ip[client_ip] = timestamps
    _last_ask_by_ip[client_ip] = now
    return False
