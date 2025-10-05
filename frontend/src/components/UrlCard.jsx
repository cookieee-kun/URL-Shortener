import { Copy, Check, Trash, Link as LinkIcon } from "lucide-react";

export default function UrlCard({ url, copiedId, onCopy, onDelete }) {
  const shortLink = `${import.meta.env.VITE_API_URL}/${url.short_url}`;
  const isCopied = copiedId === url._id;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 min-w-0 space-y-2">
        {/* Original URL */}
        <div className="flex items-center space-x-2">
					<LinkIcon className="w-4 h-4 mr-1" />
          <span className="text-gray-500 font-medium w-32">Original URL:</span>
          <a
            href={url.full_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium break-all"
          >
            {url.full_url}
          </a>
        </div>

        {/* Shortened URL */}
        <div className="flex items-center space-x-2">
					<LinkIcon className="w-4 h-4 mr-1" />
          <span className="text-gray-500 font-medium w-32">Shortened URL:</span>
          <a
            href={shortLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 font-medium flex items-center break-all"
          >
            
            {shortLink}
          </a>
          <button
            onClick={() => onCopy?.(url.short_url, url._id)}
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            title="Copy short URL"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Clicks + Delete */}
      <div className="mt-4 sm:mt-0 sm:ml-6 text-sm flex flex-col items-start sm:items-end">
        <p className="text-gray-500">Clicks: <span className="font-medium text-gray-800">{url.clicks}</span></p>
        <button
          onClick={() => onDelete?.(url._id)}
          className="mt-2 flex items-center text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash className="w-4 h-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
}
