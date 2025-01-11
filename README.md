# Text Summarizer

A web application that summarizes text, URLs, or uploaded files (PDF, DOCX, TXT) using AI. Built with **React** (frontend), **Flask** (backend), and **Google Gemini AI** for summarization.

---

## Features

- **Text Summarization**: Summarize plain text input.
- **URL Summarization**: Fetch and summarize content from a URL.
- **File Summarization**: Upload and summarize content from PDF, DOCX, or TXT files.
- **Customization**:
  - Choose summary type: Plain Text, Bullet Points, or Numbered List.
  - Adjust summary length (50 to 500 words).
- **History**: View and reuse past summaries.
- **Copy & Download**: Copy the summary to the clipboard or download it as a `.txt` file.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Flask, Python
- **AI Model**: Google Gemini AI
- **Other Tools**: Axios (HTTP requests), PyPDF2 (PDF parsing), python-docx (DOCX parsing)

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (for frontend)
- **Python 3.8+** (for backend)
- **Git** (optional, for version control)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/text-summarizer.git
cd text-summarizer
```

### 2. Set Up the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the `backend` directory and add your Google Gemini API key:
   ```plaintext
   API_KEY=your_api_key_here
   SYSTEM_PROMPT="Your system prompt here"
   ```

6. Run the Flask backend:
   ```bash
   python app.py
   ```

### 3. Set Up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## Usage

1. **Enter Text**:
   - Paste your text into the input box.

2. **Provide a URL**:
   - Enter a URL to fetch and summarize content.

3. **Upload a File**:
   - Upload a PDF, DOCX, or TXT file.

4. **Customize**:
   - Choose the summary type (Plain Text, Bullet Points, Numbered List).
   - Adjust the summary length using the slider.

5. **Summarize**:
   - Click the "Summarize" button to generate the summary.

6. **Copy or Download**:
   - Copy the summary to the clipboard or download it as a `.txt` file.

7. **View History**:
   - Access past summaries from the history section.

---

## Project Structure

```
text-summarizer/
├── backend/
│   ├── app.py                # Flask backend
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── api/              # API utilities
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # Entry point
│   ├── package.json          # Node.js dependencies
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── vite.config.ts        # Vite configuration
├── .gitignore                # Files to ignore in Git
└── README.md                 # Project documentation
```
