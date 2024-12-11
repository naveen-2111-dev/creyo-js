import React from 'react';
import "tailwindcss/tailwind.css";
import Navbar from '@/components/NavBar';

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    bio: 'Experienced full-stack developer with a passion for coding and problem-solving.',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    languages: ['Tamil', 'German'],
    profilePicture: '/images/profile.jpg',
    location: 'San Francisco, CA',
    hourlyRate: '$50/hour',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar at the top of the page */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <div className="flex items-center gap-6">
            {/* Profile Image */}
            <div className="relative inline-block">
              <img
                src={user.profilePicture}
                alt="Profile Picture"
                className="w-36 h-36 rounded-full border border-black object-cover"
              />
              {/* Green Dot in the top-right corner */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600 mt-2">{user.bio}</p>
              <p className="mt-4 text-gray-800"><strong>Location:</strong> {user.location}</p>
              <p className="mt-1 text-gray-800"><strong>Hourly Rate:</strong> {user.hourlyRate}</p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Skills</h3>
            <ul className="list-none mt-2">
              {user.skills.map((skill, index) => (
                <li key={index} className="inline-block mr-4 mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Languages</h3>
            <ul className="list-none mt-2">
              {user.languages.map((language, index) => (
                <li key={index} className="inline-block mr-4 mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm">
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;
