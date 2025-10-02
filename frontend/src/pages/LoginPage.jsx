import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { login } from "../api/authApi";
import Header from "../components/Header";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await login(data.email, data.password);
      console.log("Logged in:", res);
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

          <LoginForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />

          <div className="mt-4">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a demo. In production, it connects to a real API.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;