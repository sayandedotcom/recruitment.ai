system_prompt_matching = """
Scoring Guide:
It's ok to say candidate does not match the requirement.
Degree Section: Prioritize major than degree level. Candidate with degrees more directly relevant to the required degree should receive higher score, even if their degree level is lower.
Experience Section: Candidate with more relevant experience field get higher score.
Technical Skills Section: Candidate with more relevant technical skills get higher score.
Responsibilities Section: Candidate with more relevant responsibilities get higher score.
Certificates Section: Candidate with required certificates get higher score. Candidate without required certificates get no score. Candidate with related certificates to the position get medium score.
Soft Skills Section: Prioritize foreign language and leadership skills. Candidate with more relevant soft skills get higher score.
All comments should use singular pronouns such as "he", "she", "the candidate", or the candidate's name.
"""

fn_matching_analysis = [
    {
        "name": "evaluate",
        "description": "For each requirement, score in 0 - 100 scale if the candidate match with the requirement or not.",
        "parameters": {
            "type": "object",
            "properties": {
                "degree": {
                    "type": "object",
                    "properties": {
                        "score": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 100,
                            "description": "Score if the candidate match with the requirement or not",
                        },
                        "comment": {
                            "type": "string",
                            "description": "What match the requirement, what does not match the requirement",
                        },
                    },
                    "required": ["score", "comment"],
                },
                "experience": {
                    "type": "object",
                    "properties": {
                        "score": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 100,
                            "description": "Score if the candidate match with the requirement or not. e.g. 75 ",
                        },
                        "comment": {
                            "type": "string",
                            "description": "What match the requirement, what does not match the requirement",
                        },
                    },
                    "required": ["score", "comment"],
                },
                "technical_skill": {
                    "type": "object",
                    "properties": {
                        "score": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 100,
                            "description": "Score if the candidate match with the requirement or not. e.g. 75",
                        },
                        "comment": {
                            "type": "string",
                            "description": "What match the requirement, what does not match the requirement.",
                        },
                    },
                    "required": ["score", "comment"],
                },
                "responsibility": {
                    "type": "object",
                    "properties": {
                        "score": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 100,
                            "description": "Score if the candidate match with the requirement or not. e.g. 75",
                        },
                        "comment": {
                            "type": "string",
                            "description": "What match the requirement, what does not match the requirement.",
                        },
                    },
                    "required": ["score", "comment"],
                },
                "certificate": {
                    "type": "object",
                    "properties": {
                        "score": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 100,
                            "description": "Score if the candidate match with the requirement or not.",
                        },
                        "comment": {
                            "type": "string",
                            "description": "What match the requirement, what does not match the requirement.",
                        },
                    },
                    "required": ["score", "comment"],
                },
                "soft_skill": {
                    "type": "object",
                    "properties": {
                        "score": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 100,
                            "description": "Score if the candidate match with the requirement or not. e.g. 75",
                        },
                        "comment": {
                            "type": "string",
                            "description": "What match the requirement, what does not match the requirement, special soft skill in the CV.",
                        },
                    },
                    "required": ["score", "comment"],
                },
                "summary_comment": {
                    "type": "string",
                    "description": "Give comment about matching candidate based on requirement",
                },
            },
            "required": [
                "degree",
                "experience",
                "technical_skill",
                "responsibility",
                "certificate",
                "soft_skill",
                "summary_comment",
            ],
        },
    }
]

accept_email_system_prompt = """
You are an HR assistant responsible for candidate communication during the hiring process.

Based on a short evaluation summary, write a personalized and professional acceptance email to the candidate. Congratulate them on moving forward and briefly mention the next steps (e.g., upcoming interview or onboarding process).

The email should start with: Hi [candidate_name]

Keep the tone warm, respectful, and encouraging. The message should be no longer than 5 sentences.
"""

reject_email_system_prompt = """
You are an HR assistant responsible for candidate communication during the hiring process.

Based on a short evaluation summary, write a polite and professional rejection email to the candidate. Thank them for their time and effort, and offer encouragement for their future opportunities.

The email should start with: Hi [candidate_name]

Keep the tone respectful, empathetic, and concise. The message should be no longer than 5 sentences.
"""

accept_email_fn = [
    {
        "name": "generate_email",
        "description": "Generate an acceptance email to the candidate.",
        "parameters": {
            "type": "object",
            "properties": {
                "email_subject": {
                    "type": "string",
                    "description": "The subject of the email.",
                },
                "email_body": {
                    "type": "string",
                    "description": "The body of the email.",
                },
            },
            "required": ["email_subject", "email_body"],
        },
    }
]

reject_email_fn = [
    {
        "name": "generate_email",
        "description": "Generate a rejection email to the candidate.",
        "parameters": {
            "type": "object",
            "properties": {
                "email_subject": {
                    "type": "string",
                    "description": "The subject of the email.",
                },
                "email_body": {
                    "type": "string",
                    "description": "The body of the email.",
                },
            },
            "required": ["email_subject", "email_body"],
        },
    }
]