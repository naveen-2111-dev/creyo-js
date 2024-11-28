import Link from 'next/link';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

export default function Navbar() {
  const [isProfileCardVisible, setProfileCardVisible] = useState(false);

  const toggleProfileCard = (e) => {
    e.preventDefault();
    setProfileCardVisible(!isProfileCardVisible);
  };

  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const Decode = () => {
      try {
        const token = localStorage.getItem("AccessToken");
        const decode = jwtDecode(token);
        setMail(decode.email);
      } catch (error) {
        console.log(error);
      }
    };
    Decode();
  }, []);

  useEffect(() => {
    const response = async () => {
      try {
        const res = await fetch("api/welcome", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: mail,
          }),
        });

        const data = await res.json();
        setName(data.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    response();
  }, [mail]);

  return (

    <nav className="bg-gradient-to-r from-black to-gray-900 w-full mx-auto p-5 px-10 flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-white text-xl font-bold">
        <Link href="/">CREYO</Link>
      </div>

      {/* Search Bar and Profile Icon */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative w-[500px]">
          <input
            type="text"
            placeholder="Find your next gig here!"
            className="w-full p-2 pl-12 rounded-3xl text-black bg-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <button onClick={toggleProfileCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white hover:text-green-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.134 2 5 5.134 5 9c0 3.866 3.134 7 7 7s7-3.134 7-7c0-3.866-3.134-7-7-7zm0 14c-3.866 0-7 2.686-7 6v1h14v-1c0-3.314-3.134-6-7-6z"
              />
            </svg>
          </button>

          {/* Profile Card */}
          {isProfileCardVisible && (
            <div className="absolute right-0 bg-white text-black rounded-lg shadow-lg w-64 p-4 mt-2 z-10">
              {/* Profile Picture and Name */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{name}</h2>
                  <p className="text-sm text-gray-500">Role</p>
                </div>
              </div>

              {/* Menu Options with Icons */}
              <Link
                href="/profile"
                className="flex items-center text-left px-3 py-2 text-sm hover:bg-green-500 hover:text-white rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c2.486 0 4.5-2.014 4.5-4.5S14.486 2 12 2s-4.5 2.014-4.5 4.5S9.514 11 12 11z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 20h15a2.5 2.5 0 002.5-2.5v-3a5.5 5.5 0 00-5.5-5.5h-9A5.5 5.5 0 002 14.5v3A2.5 2.5 0 004.5 20z"
                  />
                </svg>
                Your Profile
              </Link>
              <div className="flex items-center text-left px-3 py-2 text-sm hover:bg-green-500 hover:text-white rounded-lg cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 1v22M1 12h22"
                  />
                </svg>
                Theme Settings
              </div>
              <div className="flex items-center text-left px-3 py-2 text-sm hover:bg-green-500 hover:text-white rounded-lg cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8h14M5 12h14M5 16h14"
                  />
                </svg>
                Working Status
              </div>
              <Link
                href="/messages"
                className="flex items-center text-left px-3 py-2 text-sm hover:bg-green-500 hover:text-white rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-11.7h0a8.38 8.38 0 013.8.9l5.7 3.3-1.6 4.7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.5L12 16.5 3 11.5"
                  />
                </svg>
                Message
              </Link>
              <div className="flex items-center text-left px-3 py-2 text-sm hover:bg-red-500 hover:text-white rounded-lg cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
