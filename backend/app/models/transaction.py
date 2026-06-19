from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text
from sqlalchemy.sql import func
from app.db.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String(100), unique=True, index=True, nullable=False)
    customer_id = Column(Integer, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="INR")
    transaction_date = Column(DateTime, nullable=False)
    transaction_type = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    is_valid = Column(Boolean, default=True)
    validation_errors = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())