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
  const [isWorking, setIsWorking] = useState(false);

  const toggleWorkingStatus = () => {
    setIsWorking(!isWorking);
  };

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
        <Link href="/dashboard">CREYO</Link>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
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
                className="flex items-center text-left px-3 py-2 text-sm hover:bg-black hover:text-white rounded-lg cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className='mr-2' width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
                </svg>

                Your Profile
              </Link>
              <div className="flex items-center text-left px-3 py-2 text-sm hover:bg-black hover:text-white rounded-lg cursor-pointer">
                <svg width="24" height="24" className='mr-2 ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>


                Theme Settings
              </div>
              <div
      className={`flex items-center text-left px-4 py-2 text-sm rounded-full cursor-pointer 
        ${isWorking ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`} 
      onClick={toggleWorkingStatus}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="24"
        height="24"
        className="mr-2"
      >
        <rect width="256" height="256" fill="none"></rect>
        <line
          x1="96" x2="160"
          y1="128.006" y2="128.006"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></line>
        <line
          x1="96" x2="160"
          y1="160.006" y2="160.006"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></line>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
          d="M56,40.00586H200a8,8,0,0,1,8,8v152a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24v-152A8,8,0,0,1,56,40.00586Z"
        ></path>
        <line
          x1="80" x2="80"
          y1="24.006" y2="56.006"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></line>
        <line
          x1="128" x2="128"
          y1="24.006" y2="56.006"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></line>
        <line
          x1="176" x2="176"
          y1="24.006" y2="56.006"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></line>
      </svg>
      <span>{isWorking ? 'Working Status: Active' : 'Working Status: Inactive'}</span>
    </div>
              
              <Link
                href="/messages"
                className="flex items-center text-left px-3 py-2 text-sm hover:bg-black hover:text-white rounded-lg cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className='mr-2' width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8m-8 4h4m4.24 6.24L15 19H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-4l1.24 1.24a1 1 0 01-.24 1.76z" />
                </svg>

                Message
              </Link>
              <div className="flex items-center text-left px-3 py-2 text-sm hover:bg-red-500 hover:text-white rounded-lg cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-black"
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
