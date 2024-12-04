"use client"; // Ensure this file is treated as a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+ router

export default function UserDetailsForm({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the user details
    if (setUser) {
      setUser({
        name,
        email,
        bio,
        profilePicture,
      });
    }

    // Redirect to the Home page (Main Dashboard)
    router.push("/"); // Adjust this path if your home page is different
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-black text-white">
      <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 text-black border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 text-black border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 text-black border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Profile Picture</label>
          <input
            type="file"
            onChange={handleProfilePictureChange}
            className="text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
}
