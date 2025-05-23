from src.analysis.schemas import State
from src.analysis.nodes import Nodes

from langgraph.graph import END, StateGraph

class Workflow():
    def __init__(self):
        # initiate graph state & nodes
        workflow = StateGraph(State)
        nodes = Nodes()
        
        # define all graph nodes
        workflow.add_node("resume_analysis", nodes.analyse_matching)
        workflow.add_node("accept_email_node", nodes.accept_email_node)
        workflow.add_node("reject_email_node", nodes.reject_email_node)        
        
        workflow.add_conditional_edges("resume_analysis", nodes.analyze_candidate)
        
        workflow.set_entry_point("resume_analysis")
        workflow.add_edge("accept_email_node", END)
        workflow.add_edge("reject_email_node", END)
        
        # Compile
        self.app = workflow.compile()