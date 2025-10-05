import React, { useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import AuthToggle from "../components/auth/AuthToggle";
import { login, register } from "../api/authApi";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


function AuthPage() {
  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      if (mode === "login") {
        const res = await login(data.email, data.password);
        navigate("/", { replace: true }); // replace avoids back button going to login

        console.log("Logged in:", res);
      } else {
        const res = await register(data.email, data.password, data.name);
        console.log("Registered:", res);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-transparent rounded-2xl p-8 flex flex-col items-center">
          <Header />

          <AuthForm
            mode={mode}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />

          <div className="mt-4">
            <AuthToggle mode={mode} onToggle={setMode} />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a demo. In production, it connects to a real API.</p>
        </div>
      </div>
    </div>

  );
}

export default AuthPage;
