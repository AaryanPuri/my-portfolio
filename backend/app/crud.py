from sqlalchemy.orm import Session

from . import models, schemas


def create_message(db: Session, payload: schemas.ContactMessageCreate) -> models.ContactMessage:
    message = models.ContactMessage(
        name=payload.name,
        email=payload.email,
        message=payload.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def get_messages(db: Session) -> list[models.ContactMessage]:
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()
