"use client"; // This should be at the top of the file for Next.js client-side rendering
import React, { useState } from "react";

const Settings = ({ user, setUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true); // Assume default is enabled

  const handleProfileUpdate = () => {
    setUser({ ...user, name, email, bio, profilePicture });
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      // Logic to change password
      alert("Password updated successfully!");
    }
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    alert(`Notifications ${notifications ? "disabled" : "enabled"}`);
  };

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      {/* Profile Settings */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">Profile Information</h3>
        <div className="flex flex-col gap-4">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded mt-2"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded mt-2"
            />
          </label>
          <label>
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded mt-2"
              rows="4"
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))}
              className="bg-gray-800 text-white p-2 rounded mt-2"
            />
          </label>
          <button
            onClick={handleProfileUpdate}
            className="bg-green-600 text-white py-2 px-4 rounded mt-4"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">Change Password</h3>
        <div className="flex flex-col gap-4">
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded mt-2"
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded mt-2"
            />
          </label>
          <button
            onClick={handlePasswordChange}
            className="bg-green-600 text-white py-2 px-4 rounded mt-4"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">Notification Preferences</h3>
        <div className="flex items-center gap-2">
          <label>Enable Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationToggle}
            className="w-6 h-6 bg-gray-800 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
