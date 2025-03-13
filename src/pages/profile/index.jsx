import React, { useState } from "react";

const Profile = () => {
  // State for edit mode and form values
  const [isEditMode, setIsEditMode] = useState(false);
  const [labName, setLabName] = useState("My Lab");
  const [location, setLocation] = useState("New York, USA");
  const [address, setAddress] = useState("123 Science Street");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState("+1 123 456 7890");
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("+1 987 654 3210");
  const [emailAddress, setEmailAddress] = useState("info@mylab.com");

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditMode(false); // Exit edit mode after saving
    // Add your logic to save the data (e.g., API call)
    console.log("Profile updated:", {
      labName,
      location,
      address,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      emailAddress,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Lab Profile</h2>

      {isEditMode ? (
        // Edit Form (unchanged)
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lab Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Lab Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Lab Name</label>
                <input
                  type="text"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Primary Phone Number</label>
                <input
                  type="tel"
                  value={primaryPhoneNumber}
                  onChange={(e) => setPrimaryPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Secondary Phone Number</label>
                <input
                  type="tel"
                  value={secondaryPhoneNumber}
                  onChange={(e) => setSecondaryPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={toggleEditMode}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        // Read-Only View (Improved)
        <div className="space-y-6">
          {/* Lab Information Card */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span role="img" aria-label="lab" className="mr-2">
                🧪
              </span>
              Lab Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Lab Name</label>
                <p className="text-gray-800 font-medium">{labName}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Location</label>
                <p className="text-gray-800 font-medium">{location}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                <p className="text-gray-800 font-medium">{address}</p>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span role="img" aria-label="contact" className="mr-2">
                📞
              </span>
              Contact Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Primary Phone Number</label>
                <p className="text-gray-800 font-medium">{primaryPhoneNumber}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Secondary Phone Number</label>
                <p className="text-gray-800 font-medium">{secondaryPhoneNumber}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                <p className="text-gray-800 font-medium">{emailAddress}</p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={toggleEditMode}
            className="w-full px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile