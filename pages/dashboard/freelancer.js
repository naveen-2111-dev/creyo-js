"use client";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "@/components/NavBar";
import { jwtDecode } from "jwt-decode";

import Link from "next/link";
import Cookies from "js-cookie";

import { useRouter } from 'next/router';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  const router = useRouter();


  const handleProfileClick = () => {
    router.push('/leaderboard'); // Navigate to the Profile page
  };
  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const token = Cookies.get("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          setMail(decoded.email);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoggedIn && mail) {
        try {
          const res = await fetch("/api/welcome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: mail }),
          });
          const data = await res.json();
          // console.log(data);
          setName(data.data.name);
          setRole(data.data.role);

          console.log(data.data.name)
          console.log(data.data.role)

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();

  }, [isLoggedIn, mail]);

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

  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);


  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Top Section */}
      <div className="p-6">
        {/* Greeting */}
        <div className="flex justify-between items-center">
          <h1 className="text-gray-800 text-3xl font-bold">
            {greeting}, <span className="text-orange-500">{name}</span>
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
{/* Cards Section */}
<div className="m-6"> {/* Added margin to the container */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
    {/* Card 1 */}
    <div className="relative bg-white p-6 rounded-md shadow-md hover:shadow-lg transition h-[15rem]"> {/* Increased height of the card */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Verify your email
      </h2>
      <p className="text-gray-600">
        Verifying mail is required to hire you
      </p>
      <button className="absolute bottom-4 left-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
        Verify
      </button>
    </div>

    {/* Card 2 */}
    <div className="relative bg-white p-6 rounded-md shadow-md hover:shadow-lg transition h-[15rem]"> {/* Increased height of the card */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Check A LeaderBoard
      </h2>
      <p className="text-gray-600">
        Check where you are around the world
      </p>
      <button
        className="absolute bottom-4 left-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        onClick={handleProfileClick}
      >
        Go to leaderboard
      </button>
    </div>

    {/* Card 3 */}
    <div className="relative bg-white p-6 rounded-md shadow-md hover:shadow-lg transition h-[15rem]"> {/* Increased height of the card */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Explore Jobs
      </h2>
      <p className="text-gray-600">
        Browse through thousands of freelance opportunities and find the perfect match for your skills.
      </p>
      <button className="absolute bottom-4 left-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
        Explore Now
      </button>
    </div>

    {/* Card 4 */}
    <div className="relative bg-white p-6 rounded-md shadow-md hover:shadow-lg transition h-[15rem]"> {/* Increased height of the card */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Test Skills
      </h2>
      <p className="text-gray-600">
        Write the test and get recommended more
      </p>
      <button
        className="absolute bottom-4 left-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        onClick={() => router.push("/test")}
      >
        Test Now
      </button>
    </div>
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
              className="relative bg-white w-60 h-[10rem] flex flex-col justify-center items-center rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              {/* Inner Border */}
              <div
                className="absolute inset-[6px] rounded-md border-2 border-orange-500 pointer-events-none"
              ></div>
              
              {/* Content */}
              <h2 className="text-xl font-bold text-gray-800 z-10">
                {user.firstname.split(" ")[0]} {/* Extracts the first name */}
              </h2>
              <p className="text-gray-600 z-10">{user.details}</p>
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
      <div
        className="relative bg-[url('/images/web-dev.jpg')] bg-cover bg-center border border-orange-500 h-[18rem] rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 rounded-md"></div>
        <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white z-10">Web Development</h2>
      </div>
    </Link>

    {/* Card 2 */}
    <Link href="/search/graphic-design" passHref>
      <div
        className="relative bg-[url('/images/graphic.jpg')] bg-cover bg-center border border-orange-500 h-[18rem] rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 rounded-md"></div>
        <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white z-10">Graphic Design</h2>
      </div>
    </Link>

    {/* Card 3 */}
    <Link href="/search/writing" passHref>
      <div
        className="relative bg-[url('/images/writing.jpg')] bg-cover bg-center border border-orange-500 h-[18rem] rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 rounded-md"></div>
        <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white z-10">Writing</h2>
      </div>
    </Link>

    {/* Card 4 */}
    <Link href="/search/digital-marketing" passHref>
      <div
        className="relative bg-[url('/images/digital.jpg')] bg-cover bg-center border border-orange-500 h-[18rem] rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 rounded-md"></div>
        <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white z-10">Digital Marketing</h2>
      </div>
    </Link>

    {/* Card 5 */}
    <Link href="/search/consulting" passHref>
      <div
        className="relative bg-[url('/images/consulting.jpg')] bg-cover bg-center border border-orange-500 h-[18rem] rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 rounded-md"></div>
        <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white z-10 stroke-black-6px">Consulting</h2>
      </div>
    </Link>
  </div>
</div>


    </div >
  );
}
