from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, schemas
from .config import settings
from .database import Base, engine, get_db
from .notify import send_contact_notification
from .rate_limit import is_ask_rate_limited, is_rate_limited
from . import rag

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio Contact API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact", response_model=schemas.ContactMessageOut, status_code=201)
def submit_contact_message(payload: schemas.ContactMessageCreate, request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else "unknown"
    if is_rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Please wait before sending another message.")

    saved = crud.create_message(db, payload)
    send_contact_notification(payload.name, payload.email, payload.message)
    return saved


@app.get("/api/messages", response_model=list[schemas.ContactMessageOut])
def list_messages(x_admin_key: str = Header(default=""), db: Session = Depends(get_db)):
    if x_admin_key != settings.admin_api_key:
        raise HTTPException(status_code=401, detail="Invalid or missing admin key.")

    return crud.get_messages(db)


@app.post("/api/ask", response_model=schemas.AskResponse)
def ask_nova(payload: schemas.AskRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    if is_ask_rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Give NOVA a moment before asking again.")

    try:
        answer = rag.answer_question(payload.question)
    except Exception as exc:
        print(f"[/api/ask] rag.answer_question failed: {type(exc).__name__}: {exc}")
        raise HTTPException(status_code=502, detail="NOVA couldn't reach its brain just now. Try again shortly.")

    return {"answer": answer}
