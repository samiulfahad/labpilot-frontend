import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { API_URL } from "../../../config";
import Modal from "../../components/modal";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    labId: "",
    username: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      if (!formData.labId || !formData.username || !formData.password) {
        throw new Error("Please fill in all fields");
      }
     // Simulate API call
      const response = await axios.post(API_URL + "/api/v1/lab/login", {
        labId: formData.labId,
        username: formData.username,
        password: formData.password,
        isAdmin,
      });

      if (response.data.success) {
        user = {
          username: response.data.username,
          roles: response.data.userRole,
          token: response.data.token,
        };
      }
      // login({
      //   username: 'hamim',
      //   roles: ["admin"]
      // });
    } catch (err) {
      console.log(err.response)
      if (err.response.status === 401 ) {
        setError("Invalid Username or Password");
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
      // login({
      //   username: 'hamim',
      //   roles: ["admin"]
      // });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-2">Lab Pilot</h1>
          <p className="text-gray-500 font-mono">Smart, Simple & Easy way to manage your lab</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 p-3 rounded-lg flex items-center gap-2 text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-mono text-gray-700 mb-2">Lab ID</label>
              <input
                name="labId"
                value={formData.labId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Enter Lab ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-mono text-gray-700 mb-2">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Enter Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-mono text-gray-700 mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isAdmin ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-sm font-medium">{isAdmin ? "Admin" : "Staff"}</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-mono font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
