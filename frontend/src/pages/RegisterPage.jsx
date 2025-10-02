import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { register } from "../api/authApi";
import Header from "../components/Header";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await register(data.email, data.password, data.name);
      console.log("Registered:", res);
      // Handle successful registration (e.g., redirect)
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

          <RegisterForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />

          <div className="mt-4">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Login
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

export default RegisterPage;