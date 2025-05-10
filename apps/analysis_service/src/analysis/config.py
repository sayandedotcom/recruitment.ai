from pydantic_settings import BaseSettings

class AnalysisConfig(BaseSettings):
    MODEL_NAME: str = "gpt-4.1-mini"


analysis_config = AnalysisConfig()