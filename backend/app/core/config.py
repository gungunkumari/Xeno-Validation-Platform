from pydantic_settings import BaseSettings
from sqlalchemy.engine import URL


class Settings(BaseSettings):
    APP_NAME: str = "Xeno Validator API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    DB_USER: str = "postgres"
    DB_PASSWORD: str
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "xeno_assignment"

    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]

    @property
    def DATABASE_URL(self):
        return URL.create(
            drivername="postgresql+psycopg2",
            username=self.DB_USER,
            password=self.DB_PASSWORD,
            host=self.DB_HOST,
            port=self.DB_PORT,
            database=self.DB_NAME,
        )

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()