import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/NavBar.jsx"; // assuming Navbar is in components folder

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<UrlShortenerPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
