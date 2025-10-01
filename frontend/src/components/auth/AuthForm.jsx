import React, { useState } from "react";

function AuthForm({ mode, onSubmit, isLoading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      onSubmit({ email, password });
    } else {
      onSubmit({ email, password, name });
    } 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        {mode === "login" ? "Login" : "Register"}
      </h2>

      {mode === "register" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {isLoading ? "Loading..." : mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default AuthForm;
