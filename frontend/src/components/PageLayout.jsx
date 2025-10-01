// src/components/PageLayout.jsx
import React from "react";
import Header from "./Header";

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Header />
      <div className="pt-48">
        {children}
      </div>
    </div>
  );
}
