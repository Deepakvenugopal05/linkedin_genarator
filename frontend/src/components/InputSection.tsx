import React from 'react';
import { Link, Upload, Type, List, FileText } from 'lucide-react';

interface InputSectionProps {
  text: string;
  url: string;
  summaryType: string;
  summaryLength: number;
  onTextChange: (text: string) => void;
  onUrlChange: (url: string) => void;
  onSummaryTypeChange: (type: string) => void;
  onSummaryLengthChange: (length: number) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputSection({
  text,
  url,
  summaryType,
  summaryLength,
  onTextChange,
  onUrlChange,
  onSummaryTypeChange,
  onSummaryLengthChange,
  onFileChange,
}: InputSectionProps) {
  return (
    <div className="space-y-6">

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Paste your text here..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Or enter a URL
        </label>
        <div className="flex items-center space-x-2">
          <Link className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://example.com/article"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Upload a file
        </label>
        <div className="flex items-center space-x-2">
          <Upload className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="file"
            onChange={onFileChange}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            accept=".txt,.doc,.docx,.pdf"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Summary Type
          </label>
          <div className="relative">
            <select
              value={summaryType}
              onChange={(e) => onSummaryTypeChange(e.target.value)}
              className="w-full p-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="plain">Plain Text</option>
              <option value="bullets">Bullet Points</option>
              <option value="numbered">Numbered List</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {summaryType === 'plain' && <Type className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              {summaryType === 'bullets' && <List className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              {summaryType === 'numbered' && <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Summary Length: {summaryLength} words
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="50"
            value={summaryLength}
            onChange={(e) => onSummaryLengthChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>50 words</span>
            <span>500 words</span>
          </div>
        </div>
      </div>
    </div>
  );
}