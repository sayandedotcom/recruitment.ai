from typing_extensions import TypedDict
from pydantic import BaseModel

class MatchingSchema(BaseModel):
    candidate: dict
    job: dict


class State(TypedDict):
    job: dict
    candidate: dict
    score: str
    candidate_email: str
    response: dict
