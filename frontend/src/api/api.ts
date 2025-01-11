import axios from 'axios';

interface SummaryRequest {
  text?: string;
  url?: string;
  file?: File | null;
  summaryType: string;
  summaryLength: number;
}

interface SummaryResponse {
  summary: string;
  error?: string;
}

export async function fetchSummary(data: SummaryRequest): Promise<SummaryResponse> {
    const formData = new FormData();
  
    if (data.text) {
      formData.append('input_type', 'text');
      formData.append('text', data.text);
    } else if (data.url) {
      formData.append('input_type', 'url');
      formData.append('url', data.url);
    } else if (data.file) {
      formData.append('input_type', 'file');
      formData.append('file', data.file);
    }
  
    formData.append('summary_type', data.summaryType);
    formData.append('summary_length', data.summaryLength.toString());
  
    try {
      const response = await axios.post('http://localhost:5000/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Extract the text using a regular expression
      const regex = /"text":\s*"([^"]+)"/;
      const match = response.data.summary.match(regex);
  
      if (!match || !match[1]) {
        throw new Error('Failed to extract summary text from the response.');
      }
  
      const summaryText = match[1];
  
      // Replace \n with actual new lines
      const formattedSummary = summaryText.replace(/\\n/g, '<br />');
  
      return { summary: formattedSummary };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { summary: '', error: error.response?.data?.error || 'An error occurred while fetching the summary.' };
      } else {
        return { summary: '', error: 'An unexpected error occurred.' };
      }
    }
  }