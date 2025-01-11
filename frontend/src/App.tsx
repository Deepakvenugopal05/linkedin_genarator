import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { fetchSummary } from './api/api';

function App() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summaryType, setSummaryType] = useState('plain');
  const [summaryLength, setSummaryLength] = useState(100);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);


  const handleSummarize = useCallback(async () => {
    if (!text && !url && !file) {
      setError('Please enter text, provide a URL, or upload a file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchSummary({
        text,
        url,
        file,
        summaryType,
        summaryLength,
      });

      if (response.error) {
        setError(response.error);
      } else {
        setSummary(response.summary);
      }
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [text, url, file, summaryType, summaryLength]);

  const handleCopy = useCallback(() => {

    const cleanedText = summary.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '');

    navigator.clipboard.writeText(cleanedText);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [summary]);

  const handleDownload = useCallback(() => {
    const cleanedText = summary.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '');

    const blob = new Blob([cleanedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [summary]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Text Summarizer
        </h1>

        <div className="space-y-8">

          <InputSection
            text={text}
            url={url}
            summaryType={summaryType}
            summaryLength={summaryLength}
            onTextChange={setText}
            onUrlChange={setUrl}
            onSummaryTypeChange={setSummaryType}
            onSummaryLengthChange={setSummaryLength}
            onFileChange={handleFileChange}
          />

          <button
            onClick={handleSummarize}
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>

          <OutputSection
            summary={summary}
            error={error}
            loading={loading}
            onCopy={handleCopy}
            onDownload={handleDownload}
            copied={copied}
          />

          
        </div>
      </main>
    </div>
  );
}

export default App;


