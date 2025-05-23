from langchain_google_community.gmail.send_message import GmailSendMessage
from langchain_google_community.gmail.utils import (
    build_resource_service,
    get_gmail_credentials,
)

class GmailClient:
    def __init__(self):
        credentials = get_gmail_credentials(
            token_file="token.json",
            client_secrets_file="credentials.json",
            scopes=["https://mail.google.com/"]
        )
        api_resource = build_resource_service(credentials=credentials)
        self.send_tool = GmailSendMessage(api_resource=api_resource)

send_email = GmailClient().send_tool
