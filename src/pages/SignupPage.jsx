import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dbType, setDbType] = useState("sql");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        email,
        username,
        password,
        dbType
      });
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="mb-4 w-full px-3 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={dbType}
          onChange={(e) => setDbType(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded"
        >
          <option value="sql">SQL</option>
          <option value="nosql">NoSQL</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
