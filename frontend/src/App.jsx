import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      
      <Routes>
        {/* Login/Register Page */}
        <Route path="/login" element={<AuthPage />} />

        {/* URL Shortener Page */}
        <Route path="/" element={<UrlShortenerPage />} />

        {/* Catch-all → redirect to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
