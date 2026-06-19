from typing import List
import re
from datetime import datetime


# ----------------------------
# CUSTOMER VALIDATIONS
# ----------------------------

def validate_customer_id(customer_id) -> List[str]:
    errors = []

    if not customer_id:
        errors.append("Customer ID is required")

    return errors


def validate_full_name(full_name: str) -> List[str]:
    errors = []

    if not full_name or len(str(full_name).strip()) < 2:
        errors.append("Invalid full name")

    return errors


def validate_email(email) -> List[str]:
    errors = []

    email = str(email).strip()

    if email == "" or email.lower() == "nan":
        errors.append("Email is required")
        return errors

    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"

    if not re.match(pattern, email):
        errors.append(f"Invalid email: {email}")

    return errors


def validate_phone_number(phone_number) -> List[str]:
    errors = []

    phone = str(phone_number).strip()

    if phone == "" or phone.lower() == "nan":
        errors.append("Phone number is required")
        return errors

    if not phone.isdigit() or len(phone) != 10:
        errors.append(f"Invalid phone number: {phone}")

    return errors


def validate_city(city) -> List[str]:
    errors = []

    city = str(city).strip()

    if city == "" or city.lower() == "nan":
        errors.append("City is required")

    return errors


def validate_signup_date(signup_date) -> List[str]:
    errors = []

    signup_date = str(signup_date).strip()

    if signup_date == "":
        errors.append("Signup date is required")
        return errors

    formats = [
        "%d-%m-%Y",
        "%d/%m/%Y",
        "%Y-%m-%d",
        "%m/%d/%Y"
    ]

    valid = False

    for fmt in formats:
        try:
            datetime.strptime(signup_date, fmt)
            valid = True
            break
        except:
            pass

    if not valid:
        errors.append(
            f"Invalid signup date format: {signup_date}"
        )

    return errors


# ----------------------------
# ORDER VALIDATIONS
# ----------------------------

def validate_order_id(order_id) -> List[str]:
    errors = []

    if not str(order_id).strip():
        errors.append("Order ID is required")

    return errors


def validate_order_amount(amount) -> List[str]:
    errors = []

    try:
        amount = float(amount)

        if amount <= 0:
            errors.append(
                "Order amount must be greater than 0"
            )

    except:
        errors.append(
            "Invalid order amount"
        )

    return errors


# ----------------------------
# PRODUCT VALIDATIONS
# ----------------------------

def validate_product_id(product_id) -> List[str]:
    errors = []

    if not str(product_id).strip():
        errors.append(
            "Product ID is required"
        )

    return errors


def validate_quantity(quantity) -> List[str]:
    errors = []

    try:
        quantity = int(quantity)

        if quantity <= 0:
            errors.append(
                "Quantity must be greater than 0"
            )

    except:
        errors.append(
            "Invalid quantity"
        )

    return errors


def validate_unit_price(price) -> List[str]:
    errors = []

    try:
        price = float(price)

        if price <= 0:
            errors.append(
                "Unit price must be greater than 0"
            )

    except:
        errors.append(
            "Invalid unit price"
        )

    return errors


# ----------------------------
# PAYMENT VALIDATIONS
# ----------------------------

def validate_payment_mode(mode) -> List[str]:
    errors = []

    allowed_modes = [
        "UPI",
        "CARD",
        "NETBANKING",
        "WALLET",
        "CASH"
    ]

    if str(mode).upper() not in allowed_modes:
        errors.append(
            f"Invalid payment mode: {mode}"
        )

    return errors


def validate_transaction_status(status) -> List[str]:
    errors = []

    allowed_status = [
        "SUCCESS",
        "FAILED",
        "PENDING"
    ]

    if str(status).upper() not in allowed_status:
        errors.append(
            f"Invalid status: {status}"
        )

    return errors


# ----------------------------
# MAIN VALIDATOR
# ----------------------------

def validate_transaction_row(row: dict) -> List[str]:
    errors = []

    # Customer
    errors.extend(validate_customer_id(row.get("customer_id")))
    errors.extend(validate_full_name(row.get("full_name", "")))
    errors.extend(validate_email(row.get("email", "")))
    errors.extend(validate_phone_number(row.get("phone_number", "")))
    errors.extend(validate_city(row.get("city", "")))
    errors.extend(validate_signup_date(row.get("signup_date", "")))

    # Order
    errors.extend(validate_order_id(row.get("order_id", "")))
    errors.extend(validate_order_amount(row.get("order_amount", "")))

    # Product
    errors.extend(validate_product_id(row.get("product_id", "")))
    errors.extend(validate_quantity(row.get("quantity", "")))
    errors.extend(validate_unit_price(row.get("unit_price", "")))

    # Payment
    errors.extend(validate_payment_mode(row.get("payment_mode", "")))
    errors.extend(
        validate_transaction_status(
            row.get("transaction_status", "")
        )
    )

    return errors