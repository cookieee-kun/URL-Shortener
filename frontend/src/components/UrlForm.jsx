import React, { useState } from "react";
import { ExternalLink, Link, Tag } from "lucide-react";
import { shortenUrl } from "../api/urlApi";
import { useAuth } from "../context/AuthContext";

export default function UrlForm({ onShorten }) {
  const { user } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  const [slug, setSlug] = useState("");
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

  const slugRegex = /^[a-zA-Z0-9-_]+$/;

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

    // Optional slug validation for authenticated users
    const trimmedSlug = slug.trim();
    if (user && trimmedSlug && !slugRegex.test(trimmedSlug)) {
      setError("Slug may only contain letters, numbers, hyphens, and underscores.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await shortenUrl(originalUrl, user ? (trimmedSlug || undefined) : undefined);
      onShorten(data.shortUrl, originalUrl);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to shorten URL. Try again.");
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

      {user && (
        <div className="mt-4">
          <label htmlFor="slug-input" className="block text-sm font-medium text-gray-700 mb-2">
            Custom slug (optional)
          </label>
          <div className="relative">
            <input
              id="slug-input"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g., my-brand-link"
              inputMode="text"
              autoComplete="off"
              pattern="[A-Za-z0-9_-]+"
              title="Only letters, numbers, hyphens, and underscores are allowed"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Use letters, numbers, hyphens, and underscores.</p>
        </div>
      )}

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
