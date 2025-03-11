import React, { useState } from "react";
import { useAuth } from "../../context/auth";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ labId: "", username: "", password: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const response = await login({ ...formData, isAdmin });
    if (!response.success) {
      setError(response.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-800">Lab Pilot</h1>
          <p className="text-gray-500 font-mono">Smart, Simple & Easy way to manage your lab</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 p-3 rounded-lg text-red-700">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700">Lab ID</label>
            <input
              name="labId"
              value={formData.labId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2"
              placeholder="Enter Lab ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2"
              placeholder="Enter Username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-2 rounded-full ${isAdmin ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {isAdmin ? "Admin" : "Staff"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50"
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
