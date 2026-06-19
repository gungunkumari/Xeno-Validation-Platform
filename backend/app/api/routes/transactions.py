from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os

from app.db.database import get_db
from app.schemas.transaction import (
    TransactionCreate,
    TransactionResponse,
)
from app.services.transaction_service import (
    create_transaction,
    get_all_transactions,
)
from app.services.csv_service import process_csv

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"],
)


@router.post(
    "/",
    response_model=TransactionResponse,
)
def create_transaction_endpoint(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
):
    return create_transaction(
        db=db,
        transaction=transaction,
    )


@router.get(
    "/",
    response_model=list[TransactionResponse],
)
def get_transactions(
    db: Session = Depends(get_db),
):
    return get_all_transactions(db)


@router.post("/upload")
async def upload_transactions_csv(
    file: UploadFile = File(...)
):
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(
            await file.read()
        )

    result = process_csv(
        file_path
    )

    return result


@router.get("/download/valid")
def download_valid_file():
    file_path = "outputs/cleaned_valid.csv"

    if not os.path.exists(file_path):
        return {
            "error": "Valid file not found"
        }

    return FileResponse(
        path=file_path,
        filename="cleaned_valid.csv",
        media_type="text/csv"
    )


@router.get("/download/invalid")
def download_invalid_file():
    file_path = "outputs/invalid_records.csv"

    if not os.path.exists(file_path):
        return {
            "error": "Invalid file not found"
        }

    return FileResponse(
        path=file_path,
        filename="invalid_records.csv",
        media_type="text/csv"
    )