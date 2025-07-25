from config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.analysis.router import router as analysis_router
from src.candidate.router import router as candidate_router
from src.job.router import router as job_router
from src.matching.router import router as matching_router
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Create a FastAPI app instance with the specified title from settings
app = FastAPI(title=settings.APP_NAME)

# Configure Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def healthcheck() -> bool:
    return True

app.include_router(analysis_router, prefix="/analysis", tags=["Analysis"])
app.include_router(candidate_router, prefix="/candidate", tags=["Candidate"])
app.include_router(job_router, prefix="/job", tags=["Job"])
app.include_router(matching_router, prefix="/matching", tags=["Matching"])