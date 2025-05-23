from src.analysis.schemas import MatchingSchema
from src.analysis.graph import Workflow 

from fastapi import APIRouter

# Instantiate the router
router = APIRouter()

# Import the workflow from the graph module
workflow = Workflow()
app = workflow.app

# @router.post("/rank", response_model=ResponseSchema)
@router.post("/rank")
async def analyse_matching(matching_data: MatchingSchema):
    
    result= app.invoke({
        "job" : matching_data.job,
        "candidate" : matching_data.candidate
    })
    
    return result["response"]