import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import UrlForm from "../components/UrlForm";
import UrlResult from "../components/UrlResult";
import UserUrls from "../components/UserUrls";
import { useAuth } from "../context/AuthContext"; // optional if you have AuthContext
import apiClient from "../api/apiClient";

export default function UrlShortenerPage() {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchUrls = async () => {
      try {
        const res = await apiClient.get("/user/urls");
        setUrls(res.data?.urls || []);
      } catch (err) {
        console.error("Failed to fetch URLs:", err);
      }
    };

    fetchUrls();
  }, [user]);

  const handleShorten = async (shortUrl, original) => {
    setShortenedUrl(shortUrl);
    setOriginalUrl(original);
    // Optionally refresh user's list if authenticated
    if (user) {
      try {
        const res = await apiClient.get("/user/urls");
        setUrls(res.data?.urls || []);
      } catch {}
    }
  };

  const handleDelete = (id) => {
    setUrls((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Header />
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!shortenedUrl ? (
            <UrlForm onShorten={handleShorten} />
          ) : (
            <UrlResult
              shortenedUrl={shortenedUrl}
              originalUrl={originalUrl}
              onReset={() => setShortenedUrl("")}
            />
          )}
        </div>

        <UserUrls urls={urls} onDelete={handleDelete} />
      </div>
    </div>
  );
}
