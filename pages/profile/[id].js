import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import "tailwindcss/tailwind.css";
import Navbar from '@/components/NavBar';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the id from the URL
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const Spinner = () => (
    <div className="flex justify-center items-center h-96">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );


  useEffect(() => {
    if (id) {
      fetch(`/api/profile/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserDetails(data);
          console.log(data)
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <Spinner />;

  if (!userDetails) return <p>User not found.</p>;

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
                src={userDetails.profilePicture || '/images/profile.jpg'} // Default fallback if no profile picture
                alt="Profile Picture"
                className="w-36 h-36 rounded-full border border-black object-cover"
              />
              {/* Green Dot in the top-right corner */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{userDetails.firstname}</h1>
              <p className="text-gray-600 mt-2">{userDetails.email}</p>
              <p className="mt-4 text-gray-800"><strong>Location: {userDetails.country}</strong> {userDetails.location}</p>
              <p className="mt-1 text-gray-800"><strong>Hourly Rate:</strong> {userDetails.hourlyRate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
