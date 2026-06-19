from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Xeno Validator API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    DATABASE_URL: str

    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()