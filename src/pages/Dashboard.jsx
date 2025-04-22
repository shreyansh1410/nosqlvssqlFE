import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const { email, dbType } = payload;
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/userinfo",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user info");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <div className="mb-4 text-center font-mono text-sm text-gray-700">
          Username: <span className="font-semibold">{user.username}</span><br/>
          Password: <span className="font-semibold">{user.password}</span>
        </div>
        <div className="mb-6 text-center">Welcome! You are logged in.</div>
        <div className="flex flex-col gap-4">
          <Link
            to="/account"
            className="w-full bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600"
          >
            Account Actions
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
          >
            Logout
          </button>
        </div>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}
