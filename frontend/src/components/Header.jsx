import React from "react";
import { Link } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
        <Link className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
      <p className="text-gray-600">
        Transform your long URLs into short, shareable links
      </p>
    </div>
  );
}
