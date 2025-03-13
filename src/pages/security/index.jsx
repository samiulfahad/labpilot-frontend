import React, { useState } from "react";

const Security = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [activeSessions, setActiveSessions] = useState(3); // Example: 3 active sessions
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (oldPassword && newPassword) {
      setMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } else {
      setMessage("Please fill in both fields.");
    }
  };

  const handleLogoutAllSessions = () => {
    setActiveSessions(0);
    setMessage("All active sessions have been logged out.");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-6">
      {/* Password Change Form */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter old password"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Change Password
          </button>
        </form>

        {message && (
          <div className="mt-4 p-2 text-sm text-green-600 bg-green-50 rounded-md text-center">
            {message}
          </div>
        )}
      </div>

      {/* Active Sessions Section */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Sessions</h2>
        <p className="text-sm text-gray-600 mb-4">
          You have <span className="font-medium text-indigo-600">{activeSessions}</span> active sessions.
        </p>
        <button
          onClick={handleLogoutAllSessions}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout All Sessions
        </button>
      </div>
    </div>
  );
};

export default Security;