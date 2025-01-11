export function extractTextFromResponse(response: any): string {
    const text = response.result.candidates[0].content.parts[0].text;
    return text.replace(/\\n/g, '\n');
  }