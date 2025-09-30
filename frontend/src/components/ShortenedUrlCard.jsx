import React from "react";
import { Copy, Check } from "lucide-react";

export default function ShortenedUrlCard({
  shortenedUrl,
  originalUrl,
  copied,
  handleCopy,
  handleReset,
}) {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-6 border-2  border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Your shortened URL:
      </h3>
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-white rounded-lg px-4 py-3 border border-gray-200">
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 font-medium break-all"
          >
            {shortenedUrl}
          </a>
        </div>
        <button
          onClick={handleCopy}
          className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors duration-200 flex items-center"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      {copied && (
        <p className="mt-2 text-sm text-green-600">Copied to clipboard!</p>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Original URL:</p>
        <p className="text-sm text-gray-800 break-all bg-white p-2 rounded border">
          {originalUrl}
        </p>
      </div>

      <button
        onClick={handleReset}
        className="mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm"
      >
        Shorten another URL
      </button>
    </div>
  );
}
