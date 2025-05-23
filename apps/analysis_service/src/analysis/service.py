import json
import jsbeautifier

from src.analysis.config import analysis_config

from langchain_openai import ChatOpenAI

class Service:
    def __init__(self):
        self.llm = self._init_llm()
    
    def _init_llm(self):
        """Initializes and returns the LLM model."""
        return ChatOpenAI(
            model= analysis_config.MODEL_NAME,
        )
    
    def output2json(self, output) -> dict:
        """Convert GPT function_call output to JSON."""
        opts = jsbeautifier.default_options()
        return json.loads(jsbeautifier.beautify(output["function_call"]["arguments"], opts))
    
    def generate_content(self, job, candidate) -> str:
        """Format job and candidate into a string for LLM input."""
        return f"\nRequirement: {job}\nCandidate: {candidate}"
