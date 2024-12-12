import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "@/components/NavBar";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const handleProfileClick = () => {
    router.push('/profile'); // Navigate to the Profile page
  };
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/retriveUser");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the data for debugging

        // Check if data is an array
        if (!Array.isArray(data)) {
          throw new Error("API did not return an array");
        }

        // Filter users who have the role "client"
        const filteredUsers = data.filter((user) => user.role === "client");
        setUsers(filteredUsers); // Set the filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleClick = () => {
    router.push('/startwork'); // Replace with your actual path
  };


  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Top Section */}
      <div className="p-6">
        {/* Greeting */}
        <div className="flex justify-between items-center">
          <h1 className="text-gray-800 text-3xl font-bold">
            Good Morning, <span className="text-orange-500">username</span>
          </h1>

          {/* Start Work Button */}
          <button
            className="py-2 px-4 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600 transition"
            onClick={handleClick}
          >
            Start Work
          </button>
        </div>

        <h1 className="text-bold text-2xl mt-10">Last Update</h1>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Verify your email
            </h2>
            <p className="text-gray-600">
              Verifying mail is required to hire you
            </p>
            <button className="mt-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
              Verify
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              View Profile
            </h2>
            <p className="text-gray-600">
              Update your profile, showcase your portfolio, and attract potential clients.
            </p>
            <button
              className="mt-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              onClick={handleProfileClick}
            > 
              Go to Profile
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Explore Jobs
            </h2>
            <p className="text-gray-600">
              Browse through thousands of freelance opportunities and find the perfect match for your skills.
            </p>
            <button className="mt-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
              Explore Now
            </button>
          </div>
        </div>
      </div>


      <div className="p-6">
        <h1 className="text-bold text-2xl mt-10">Recommend Clients</h1>
        <div className="overflow-x-auto mt-5">
          <div className="flex space-x-6 w-max">
            {loading ? (
              <p className="text-gray-500">Loading users...</p>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <Link key={index} href={`/profile/${user._id}`} passHref>
                  <div
                    className="bg-white w-60 h-[10rem] flex flex-col justify-center items-center rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    {/* Display only the first name */}
                    <h2 className="text-xl font-bold text-gray-800">
                      {user.firstname.split(" ")[0]} {/* Extracts the first name */}
                    </h2>
                    <p className="text-gray-600">{user.details}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No users found</p>
            )}
          </div>
        </div>
      </div>



      {/* Search by Category Section */}
      <div className="p-6">
        <h1 className="text-bold text-2xl mt-10">Find work by Category</h1>
        <div className="grid grid-cols-1 h-98 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
          {/* Card 1 */}
          <Link href="/search/web-development" passHref>
            <div className="bg-orange-500 border border-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">Web Development</h2>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/search/graphic-design" passHref>
            <div className="bg-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">Graphic Design</h2>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/search/writing" passHref>
            <div className="bg-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">Writing</h2>
            </div>
          </Link>

          {/* Card 4 */}
          <Link href="/search/digital-marketing" passHref>
            <div className="bg-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">Digital Marketing</h2>
            </div>
          </Link>

          {/* Card 5 */}
          <Link href="/search/consulting" passHref>
            <div className="bg-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">Consulting</h2>
            </div>
          </Link>
        </div>
      </div>

    </div >
  );
}
