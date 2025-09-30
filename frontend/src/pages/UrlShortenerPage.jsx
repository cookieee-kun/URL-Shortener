import React, { useState } from "react";
import Header from "../components/Header";
import UrlForm from "../components/UrlForm";
import UrlResult from "../components/UrlResult";

export default function UrlShortenerPage() {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const handleShorten = (shortUrl, original) => {
    setShortenedUrl(shortUrl);
    setOriginalUrl(original);
  };

  const handleReset = () => {
    setShortenedUrl("");
    setOriginalUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!shortenedUrl ? (
            <UrlForm onShorten={handleShorten} />
          ) : (
            <UrlResult
              shortenedUrl={shortenedUrl}
              originalUrl={originalUrl}
              onReset={handleReset}
            />
          )}
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a demo. In production, it connects to a real API.</p>
        </div>
      </div>
    </div>
  );
}
