from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TransactionBase(BaseModel):
    transaction_id: str
    customer_id: int
    amount: float
    currency: str
    transaction_date: datetime
    transaction_type: str
    status: str
    description: Optional[str] = None


class TransactionCreate(TransactionBase):
    pass


class TransactionResponse(TransactionBase):
    id: int
    is_valid: Optional[bool] = None
    validation_errors: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True