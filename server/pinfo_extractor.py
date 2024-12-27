def pinfo_extractor(resume_text):
    context = f"Resume text: {resume_text}"
    question = """ From above candidate's resume text, extract the only following details:
                Name: (Find the candidate's full name. If not available, specify "not available.")
                Email: (Locate the candidate's email address. If not available, specify "not available.")
                Phone Number: (Identify the candidate's phone number. If not found, specify "not available.")
                Years of Experience: (If not explicitly mentioned, calculate the years of experience by analyzing the time durations at each company or position listed. Sum up the total durations to estimate the years of experience. If not determinable, write "not available.")
                Skills Set: Extract the skills which are purely technical and represent them as: [skill1, skill2,... <other skills from resume>]. If no skills are provided, state "not available."
                Profile: (Identify the candidate's job profile or designation. If not mentioned, specify "not available.")
                Summary: provide a brief summary of the candidate's profile without using more than one newline to segregate sections.
                """

    prompt = f"""
        Based on the below given candidate information, only answer asked question:
        {context}
        Question: {question}
    """
    # print(prompt)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful HR recruiter."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700,
        temperature=0.5,
        n=1  # assuming you want one generation per document
    )
    # Extract the generated response
    response_text = response.choices[0].message.content # response['choices'][0]['message']['content']
    # print(response_text)
    # Split the response_text into lines
    lines = response_text.strip().split('\n')

    # Now, split each line on the colon to separate the labels from the values
    # Extract the values
    name = lines[0].split(': ')[1]
    email = lines[1].split(': ')[1]
    phone_no = lines[2].split(': ')[1]
    years_of_expiernce = lines[3].split(': ')[1]
    skills = lines[4].split(': ')[1]
    profile = lines[5].split(': ')[1]
    summary = lines[6].split(': ')[1]
    data_dict = {
        'name': name,
        'email': email,
        'phone_no': phone_no,
        'years_of_expiernce': years_of_expiernce,
        'skills': skills,
        'profile': profile,
        'summary': summary
    }
    # print(data_dict, "\n")
    return data_dict;