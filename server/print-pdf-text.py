def print_pdf_text(url=None, file_path=None):
    # Determine the source of the PDF (URL or local file)
    if url:
        response = requests.get(url)
        response.raise_for_status()  # Ensure the request was successful
        temp_file_path = "temp_pdf_file.pdf"
        with open(temp_file_path, 'wb') as temp_file:
            temp_file.write(response.content)  # Save the PDF to a temporary file
        pdf_source = temp_file_path
    elif file_path:
        pdf_source = file_path  # Set the source to the provided local file path
    else:
        raise ValueError("Either url or file_path must be provided.")

    # Extract text using pdfminer
    text = extract_text(pdf_source)

    # Remove special characters except "@", "+", ".", and "/"
    cleaned_text = re.sub(r"[^a-zA-Z0-9\s@+./:,]", "", text)

    # Format the text for better readability
    cleaned_text = cleaned_text.replace("\n\n", " ").replace("\n", " ")
    # If a temporary file was used, delete it
    if url and os.path.exists(temp_file_path):
        os.remove(temp_file_path)

    return cleaned_text