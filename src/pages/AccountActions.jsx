import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AccountActions() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Update account info
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post(`${BACKEND_URL}/api/account/request-update`, {
        username,
        password,
        token: localStorage.getItem("token"),
      });
      setMessage("Verification email sent for update.");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    }
  };

  // Delete account
  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post(`${BACKEND_URL}/api/account/request-delete`, {
        email,
        token: localStorage.getItem("token"),
      });
      setMessage("Verification email sent for deletion.");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Account Actions</h2>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleUpdate} className="mb-6">
          <h3 className="font-semibold mb-2">Update Account Info</h3>
          <input
            type="text"
            placeholder="New Username"
            className="mb-2 w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="mb-2 w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Request Update
          </button>
        </form>
        <form onSubmit={handleDelete}>
          <h3 className="font-semibold mb-2">Delete Account</h3>
          <input
            type="email"
            placeholder="Confirm Email"
            className="mb-2 w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Request Delete
          </button>
        </form>
      </div>
    </div>
  );
}
