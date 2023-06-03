from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):
    DETA_PK: str
    DETA_NAME_DB: str
    CORS_URL: List[str]

    class Config:
        env_file = ".env"


settings = Settings()
