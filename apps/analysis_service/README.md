# Analysis service

## Development Environment

1. **Create Environment and Install Packages**

   ```shell
   conda create -n analysis_service python=3.10
   ```

   ```shell
   conda activate analysis_service
   ```

   ```shell
   pip install -r requirements.txt
   ```

2. **Get credendials.json file**
   To use Gmail Toolkit, you will need to set up your credentials explained in the Gmail API docs. Once you've downloaded the credentials.json file, you can start using the Gmail API. Upload the credentials.json file to the root directory of the project.

   ```shell
   https://developers.google.com/workspace/gmail/api/quickstart/python#authorize_credentials_for_a_desktop_application
   ```

3. **Run the Application**

   ```shell
   uvicorn app:app --port 7000
   ```

4. **Swagger**
   Access the Swagger documentation at:

   ```shell
   http://localhost:port/docs
   ```
