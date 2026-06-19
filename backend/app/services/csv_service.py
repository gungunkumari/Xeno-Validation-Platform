import os
import pandas as pd

from app.utils.validators import validate_transaction_row


def split_csv_into_chunks(
    df,
    output_dir,
    chunk_size=100
):
    chunk_dir = os.path.join(
        output_dir,
        "chunks"
    )

    os.makedirs(
        chunk_dir,
        exist_ok=True
    )

    chunk_files = []

    for i in range(
        0,
        len(df),
        chunk_size
    ):
        chunk = df.iloc[
            i:i + chunk_size
        ]

        chunk_file = os.path.join(
            chunk_dir,
            f"chunk_{i // chunk_size + 1}.csv"
        )

        chunk.to_csv(
            chunk_file,
            index=False
        )

        chunk_files.append(
            chunk_file
        )

    return chunk_files


def process_csv(file_path: str):
    # Read CSV
    df = pd.read_csv(file_path)

    # Replace NaN values with empty strings
    df = df.fillna("")

    # Create outputs folder automatically
    output_dir = "outputs"
    os.makedirs(output_dir, exist_ok=True)

    # Generate chunk files
    chunk_files = split_csv_into_chunks(
        df,
        output_dir,
        chunk_size=100
    )

    valid_rows = []
    invalid_rows = []

    # Duplicate tracking
    seen_customer_ids = set()
    seen_emails = set()

    for index, row in df.iterrows():
        row_dict = row.to_dict()

        errors = validate_transaction_row(row_dict)

        # Check duplicate customer_id
        customer_id = str(
            row_dict.get("customer_id", "")
        ).strip()

        if customer_id:
            if customer_id in seen_customer_ids:
                errors.append(
                    "Duplicate customer_id"
                )
            else:
                seen_customer_ids.add(
                    customer_id
                )

        # Check duplicate email
        email = str(
            row_dict.get("email", "")
        ).strip().lower()

        if email:
            if email in seen_emails:
                errors.append(
                    "Duplicate email"
                )
            else:
                seen_emails.add(
                    email
                )

        if errors:
            invalid_rows.append({
                "row_number": index + 1,
                "errors": errors,
                "data": row_dict
            })
        else:
            valid_rows.append(
                row_dict
            )

    # Generate downloadable CSV files
    valid_file = os.path.join(
        output_dir,
        "cleaned_valid.csv"
    )

    invalid_file = os.path.join(
        output_dir,
        "invalid_records.csv"
    )

    pd.DataFrame(valid_rows).to_csv(
        valid_file,
        index=False
    )

    pd.DataFrame(invalid_rows).to_csv(
        invalid_file,
        index=False
    )

    return {
        "total_rows": len(df),
        "valid_rows": len(valid_rows),
        "invalid_rows": len(invalid_rows),

        "valid_file": valid_file,
        "invalid_file": invalid_file,

        "chunk_files": chunk_files,

        "valid_data": valid_rows,
        "errors": invalid_rows
    }