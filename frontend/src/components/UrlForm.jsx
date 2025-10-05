import React, { useState } from "react";
import { ExternalLink, Link } from "lucide-react";
import { shortenUrl } from "../api/urlApi";

export default function UrlForm({ onShorten }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!originalUrl.trim()) {
      setError("Please enter a URL");
      return;
    }
    if (!isValidUrl(originalUrl)) {
      setError("Please enter a valid URL (including http:// or https://)");
      return;
    }

    setIsLoading(true);
    try {
      const data = await shortenUrl(originalUrl);
      console.log(data.shortUrl);
      onShorten(data.shortUrl, originalUrl);
    } catch (err) {
      setError("Failed to shorten URL. Try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
        Enter your URL
      </label>
      <div className="relative">
        <input
          id="url-input"
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
        <ExternalLink className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
            Shortening...
          </>
        ) : (
          <>
            <Link className="w-4 h-4 mr-2" />
            Shorten URL
          </>
        )}
      </button>
    </div>
  );
}
