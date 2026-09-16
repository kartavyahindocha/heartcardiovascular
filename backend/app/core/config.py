import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "CardioHealth AI"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # ModelManage API Settings
    MODEL_MANAGE_BASE_URL: str = os.getenv("MODEL_MANAGE_BASE_URL", "")
    MODEL_MANAGE_API_KEY: str = os.getenv("MODEL_MANAGE_API_KEY", "")
    MODEL_MANAGE_TIMEOUT: int = int(os.getenv("MODEL_MANAGE_TIMEOUT", "60"))

settings = Settings()
