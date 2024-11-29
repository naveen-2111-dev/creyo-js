import '@/app/globals.css';
import React, { useState } from 'react';

const Profile = () => {
  const [imgError, setImgError] = useState(false);
  const [resume, setResume] = useState(null);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen p-10 md:p-16 lg:p-20">
      <div className="flex mb-12 border-b-2 border-gray-300 pb-8">
        <div className="w-1/3 flex justify-center">
          <div className="container mx-auto p-10">
            <div
              className={`rounded-full w-48 h-48 flex items-center justify-center ${
                imgError ? 'bg-gray-200' : ''
              }`}
            >
              <img
                src={imgError ? '/fallback.jpg' : './profile.jpg'}
                alt="Profile"
                className="rounded-full w-48 h-48 object-cover"
                onError={handleImageError}
              />
              {imgError && <span className="text-gray-600 text-lg">No Image</span>}
            </div>
          </div>
        </div>
        <div className="w-2/3 pl-8">
          <h1 className="text-4xl font-bold text-black">Vikram Thirivkram</h1>
          <p className="text-xl text-gray-700">Full Stack Developer</p>
          <p className="text-gray-500">Location: India</p>
          <div className="mt-6 flex space-x-6">
            <button className="flex items-center bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-3 rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M17.414 2.586a2 2 0 010 2.828l-9 9-2.828 2.828a2 2 0 01-1.415.586H3a1 1 0 01-1-1V13a2 2 0 01.586-1.415l2.828-2.828 9-9a2 2 0 012.828 2.828z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">Edit Profile</span>
            </button>
            <button className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15 10a3 3 0 11-6 0 3 3 0 016 0zm-7 0a4 4 0 118 0 4 4 0 01-8 0zm2 3a1 1 0 011-1h1V9a1 1 0 112 0v3h1a1 1 0 110 2h-3a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">Share Profile</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-black">About Me</h3>
        <p className="text-gray-700">
          I'm a passionate full-stack developer with 5+ years of experience in creating high-quality web
          applications. I specialize in JavaScript, Node.js, React, and MongoDB.
        </p>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-black mb-6">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-full text-center shadow-xl hover:scale-105 transform transition-all">
            <h4 className="text-lg font-semibold text-white">JavaScript</h4>
          </div>
          {/* Add more skills as required */}
        </div>
      </div>

      {/* Remaining sections */}
    </div>
  );
};

export default Profile;
