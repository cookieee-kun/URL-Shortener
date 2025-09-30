import React, { useState } from "react";
import ShortenedUrlCard from "./ShortenedUrlCard";

const UrlResult = ({ shortenedUrl, originalUrl, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ShortenedUrlCard
      shortenedUrl={shortenedUrl}
      originalUrl={originalUrl}
      copied={copied}
      handleCopy={handleCopy}
      handleReset={onReset}
    />
  );
};

export default UrlResult;
