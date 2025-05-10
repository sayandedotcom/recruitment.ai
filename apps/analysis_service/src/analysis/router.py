from fastapi import APIRouter, File, UploadFile
from src.analysis import service

router = APIRouter()


# @router.post("/analyse", response_model=ResponseSchema)
@router.post("/analyse")
async def analyse_candidate(file: UploadFile = File(...)):
    # if file.content_type != 'application/json':
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Wow, That's not allowed")


    result = service.run_candidate_screening(application=file.file.read())

    return result