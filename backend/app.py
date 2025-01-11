import os
from dotenv import load_dotenv
import requests
from PyPDF2 import PdfReader
from docx import Document
import google.generativeai as genai
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

load_dotenv()

API_KEY = os.getenv("API_KEY")
SYSTEM_PROMPT = os.getenv("SYSTEM_PROMPT")

if not API_KEY or not SYSTEM_PROMPT:
    raise ValueError("API_KEY or SYSTEM_PROMPT is missing in the .env file.")

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash", system_instruction=SYSTEM_PROMPT)

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Helper Functions

def get_text_content(request):
    text = request.form.get("text")
    if not text:
        raise ValueError("Text input is missing.")
    return text

def get_url_content(request):
    url = request.form.get("url")
    if not url:
        raise ValueError("URL input is missing.")
    
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        raise ValueError("Failed to fetch content from the URL.")

def get_file_content(file):
    if not file:
        raise ValueError("No file uploaded.")
    
    filename = secure_filename(file.filename)
    if filename.endswith(".pdf"):
        reader = PdfReader(file)
        return " ".join(page.extract_text() for page in reader.pages)
    elif filename.endswith(".docx"):
        doc = Document(file)
        return " ".join(paragraph.text for paragraph in doc.paragraphs)
    elif filename.endswith(".txt"):
        return file.read().decode("utf-8")
    else:
        raise ValueError("Unsupported file format.")

def get_content_from_input(input_type, request):
    if input_type == "text":
        return get_text_content(request)
    elif input_type == "url":
        return get_url_content(request)
    elif input_type == "file":
        file = request.files.get("file")
        return get_file_content(file)
    else:
        raise ValueError("Invalid input type.")

def generate_summary(content):
    if not content:
        raise ValueError("No content to summarize.")
    
    response = model.generate_content(content)
    return f"Summarized content: {response}"


@app.route("/summarize", methods=["POST"])
def summarize_content():
    try:

        input_type = request.form.get("input_type")

        content = get_content_from_input(input_type, request)

        summary = generate_summary(content)

        return jsonify({"summary": summary})

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
