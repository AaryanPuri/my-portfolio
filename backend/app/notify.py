import httpx

from .config import settings

RESEND_ENDPOINT = "https://api.resend.com/emails"


def send_contact_notification(name: str, email: str, message: str) -> None:
    if not settings.resend_api_key or not settings.contact_notify_email:
        return

    body = (
        f"New message from {name} ({email})\n\n"
        f"{message}"
    )

    try:
        httpx.post(
            RESEND_ENDPOINT,
            headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            json={
                "from": "Portfolio Contact <contact@aaryanpuri.me>",
                "to": [settings.contact_notify_email],
                "reply_to": email,
                "subject": f"New portfolio message from {name}",
                "text": body,
            },
            timeout=10,
        )
    except httpx.HTTPError as exc:
        print(f"[notify] failed to send contact email: {type(exc).__name__}: {exc}")
