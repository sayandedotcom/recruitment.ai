api_key = getpass.getpass('OpenAI API Key: ')
openai.api_key = api_key
client = OpenAI(api_key = api_key)

def get_embedding(text, model="text-embedding-ada-002"):
    text = text.replace("\n", " ")
    response = openai.embeddings.create(input=[text], model=model)
    return response.data[0].embedding