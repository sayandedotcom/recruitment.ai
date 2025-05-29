import time

from src.analysis.service import Service
from src.analysis.schemas import State
from src.analysis.prompts import system_prompt_matching, fn_matching_analysis, accept_email_system_prompt, reject_email_system_prompt
from src.analysis.tools.email.email import send_email
from src.utils import LOGGER

from langchain_core.messages import HumanMessage, SystemMessage


class Nodes:
    def __init__(self):
        self.service = Service()
    
    def analyze_candidate(self, state: State) -> str:
        if state["score"] > 80:
            return "accept_email_node"
        else:
            return "reject_email_node"
    
    def analyse_matching(self, state: State) -> State:
        start = time.time()
        LOGGER.info("Start analyse matching")
        
        content = self.service.generate_content(job=state["job"], candidate=state["candidate"])
        
        completion = self.service.llm.invoke(
            [
                SystemMessage(content=system_prompt_matching),
                HumanMessage(content=content),
            ],
            functions=fn_matching_analysis,
        )
        output_analysis = completion.additional_kwargs
        
        json_output = self.service.output2json(output=output_analysis)
        
        # Extract scores and store them in a list
        weights = {
            "degree": 0.1,  # The importance of the candidate's degree
            "experience": 0.2,  # The weight given to the candidate's relevant work experience
            "technical_skill": 0.3,  # Weight for technical skills and qualifications
            "responsibility": 0.25,  # How well the candidate's past responsibilities align with the job
            "certificate": 0.1,  # The significance of relevant certifications
            "soft_skill": 0.05,  # Importance of soft skills like communication, teamwork, etc.
        }
        total_weight = 0
        weighted_score = 0
        
        for section in json_output:
            if section != "summary_comment":
                weighted_score += int(json_output[section]["score"]) * weights[section]
                total_weight += weights[section]
                
        final_score = weighted_score / total_weight
        
        json_output["score"] = final_score
        
        LOGGER.info("Done analyse matching")
        LOGGER.info(f"Time analyse matching: {time.time() - start}")
        return {
            "response": json_output,
            "score": final_score,
            "candidate_email": state["candidate"]["email"],
        }
    
    def accept_email_node(self, state: State) -> State:
        candidate_email = state["candidate_email"]
        
        email_body = self.service.llm.invoke(
            [
                SystemMessage(content=accept_email_system_prompt),
                HumanMessage(content=state["response"]["summary_comment"]),
            ],
        )
        
        # Call GmailSendMessage tool
        tool_input = {
            "to": [candidate_email],
            "subject": "Congratulations! You are selected for the next round of interview",    
            "message": email_body.content,
        }
        
        # Simulate sending email
        send_email.invoke(tool_input)
        
        state["response"]["status"] = "accepted"
        
        return {
            "response": state["response"]
        }
    
    def reject_email_node(self, state: State) -> State:
        candidate_email = state["candidate_email"]
        
        email_body = self.service.llm.invoke(
            [
                SystemMessage(content=reject_email_system_prompt),
                HumanMessage(content=state["response"]["summary_comment"]),
            ],
        )
        
        # Call GmailSendMessage tool
        tool_input = {
            "to": [candidate_email],
            "subject": "Thank you for your application",    
            "message": email_body.content,
        }
        
        # Simulate sending email
        send_email.invoke(tool_input)
        
        state["response"]["status"] = "rejected"
        
        return {
            "response": state["response"]
        }
