from sqlalchemy.orm import Session

from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate


def create_transaction(
    db: Session,
    transaction: TransactionCreate,
    is_valid: bool = True,
    validation_errors: str | None = None,
):
    db_transaction = Transaction(
        transaction_id=transaction.transaction_id,
        customer_id=transaction.customer_id,
        amount=transaction.amount,
        currency=transaction.currency,
        transaction_date=transaction.transaction_date,
        transaction_type=transaction.transaction_type,
        status=transaction.status,
        description=transaction.description,
        is_valid=is_valid,
        validation_errors=validation_errors,
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


def get_transaction_by_id(
    db: Session,
    transaction_id: str,
):
    return (
        db.query(Transaction)
        .filter(Transaction.transaction_id == transaction_id)
        .first()
    )


def get_all_transactions(
    db: Session,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(Transaction)
        .offset(skip)
        .limit(limit)
        .all()
    )