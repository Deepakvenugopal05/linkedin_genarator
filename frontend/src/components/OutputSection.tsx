import { Copy, Download, Check, AlertCircle } from 'lucide-react';

interface OutputSectionProps {
  summary: string;
  error: string | null;
  loading: boolean;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}

export function OutputSection({
  summary,
  error,
  loading,
  onCopy,
  onDownload,
  copied,
}: OutputSectionProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
          <p className="ml-2 text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
        <div className="flex justify-end space-x-2 mb-4">
          <button
            onClick={onCopy}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </div>
    </div>
  );
}