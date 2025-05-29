from src.analysis.schemas import MatchingSchema
from src.analysis.graph import Workflow 

from fastapi import APIRouter

router = APIRouter()

workflow = Workflow()
app = workflow.app

@router.post("/agent")
async def analyse_matching(matching_data: MatchingSchema):
    result = app.invoke({
        "job": matching_data.job,
        "candidate": matching_data.candidate
    })
    
    return result["response"]