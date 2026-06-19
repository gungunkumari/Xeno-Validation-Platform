from typing import List
from datetime import datetime
import re

from app.utils.country_rules import COUNTRY_PHONE_RULES


def validate_customer_id(customer_id) -> List[str]:
    errors = []

    if customer_id is None or str(customer_id).strip() == "":
        errors.append("Customer ID is missing")

    return errors


def validate_full_name(name) -> List[str]:
    errors = []

    if not str(name).strip():
        errors.append("Full name is required")

    return errors


def validate_email(email) -> List[str]:
    errors = []

    email = str(email)

    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'

    if not re.match(pattern, email):
        errors.append("Invalid email")

    return errors


def validate_phone_number(phone, country_code) -> List[str]:
    errors = []

    phone = str(phone).strip()
    country_code = str(country_code).strip().upper()

    if country_code not in COUNTRY_PHONE_RULES:
        errors.append(f"Unsupported country code: {country_code}")
        return errors

    expected_length = COUNTRY_PHONE_RULES[country_code]

    if not phone.isdigit():
        errors.append("Phone number must contain only digits")

    elif len(phone) != expected_length:
        errors.append(
            f"Phone number must be {expected_length} digits for {country_code}"
        )

    return errors


def validate_city(city) -> List[str]:
    errors = []

    if not str(city).strip():
        errors.append("City is required")

    return errors


def validate_signup_date(date_value) -> List[str]:
    errors = []

    try:
        datetime.strptime(str(date_value), "%d-%m-%Y")
    except:
        try:
            datetime.strptime(str(date_value), "%d/%m/%Y")
        except:
            try:
                datetime.strptime(str(date_value), "%Y-%m-%d")
            except:
                errors.append(
                    "Invalid signup date format. Use DD-MM-YYYY, DD/MM/YYYY, or YYYY-MM-DD"
                )

    return errors


def validate_transaction_row(row: dict) -> List[str]:
    errors = []

    errors.extend(validate_customer_id(row.get("customer_id")))
    errors.extend(validate_full_name(row.get("full_name", "")))
    errors.extend(validate_email(row.get("email", "")))

    errors.extend(
        validate_phone_number(
            row.get("phone_number", ""),
            row.get("country_code", ""),
        )
    )

    errors.extend(validate_city(row.get("city", "")))
    errors.extend(validate_signup_date(row.get("signup_date", "")))

    return errors