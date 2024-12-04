"use client"; // This line should be the first line in the file
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Settings from './settings.js'; // Adjust the path according to where your Settings component is located
import PostJob from './post job.js';
import Messages from './messages.js';
import Projects from './projects.js';
import Profile from './profile.js';
import BrowseJobs from './browsejobs.js';
import { FaBell } from 'react-icons/fa'; // Importing bell icon from react-icons

// Main App
export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Full Stack Developer with 5 years of experience in web and mobile applications.",
    profilePicture: "/profile.jpg", // Default profile picture
  });

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <Projects />;
      case "profile":
        return <Profile user={user} setUser={setUser} />;
      case "messages":
        return <Messages />;
      case "post-job":
        return <PostJob />;
      case "browse-jobs":
        return <BrowseJobs />;
      case "settings":
        return <Settings user={user} setUser={setUser} />;
      case "job-categories":
        return <JobCategories />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="p-6 flex-1 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
}

// Sidebar Component
const Sidebar = ({ setCurrentPage }) => (
  <div className="w-64 bg-green-500 text-black flex flex-col p-4">
    <h2 className="text-xl font-bold mb-6">Creyo</h2>
    <nav className="flex-1 space-y-4">
      {[
        "dashboard",
        "projects",
        "profile",
        "messages",
        "post-job",
        "browse-jobs",
        "settings",
        "job-categories"
      ].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className="block py-2 px-4 rounded hover:bg-green-600 text-left w-full"
        >
          {page.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        </button>
      ))}
    </nav>
  </div>
);

// Header Component with Notification and Profile Pop-Ups
const Header = ({ user }) => {
  const router = useRouter(); // Initialize the useRouter hook
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifications = [
    "Project X deadline extended.",
    "New message from Jane Doe.",
    "Your profile was viewed by 3 clients.",
  ];

  const handleLogout = () => {
    router.push("/logout"); // Redirect to the logout page
  };

  return (
    <header className="bg-black shadow-md p-4 flex justify-between items-center relative">
      <h1 className="text-2xl font-bold">Creyo Dashboard</h1>
      <div className="flex space-x-4 items-center">
        {/* Notification Icon */}
        <div className="relative">
          <FaBell
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold mb-2">Notifications</h3>
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="text-sm mb-2 last:mb-0 border-b pb-2 last:border-b-0"
                    >
                      {notification}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">No new notifications</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg p-2 text-black"
        />

        {/* Profile Picture with Pop-Up */}
        <div className="relative">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-8 h-8 rounded-full border cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
              <div className="mb-3">
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                className="w-full text-left text-sm py-1 px-2 hover:bg-gray-200 rounded"
                onClick={() => alert("View Profile clicked")}
              >
                View Profile
              </button>
              <button
                className="w-full text-left text-sm py-1 px-2 mt-2 hover:bg-gray-200 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Dashboard Page Component
const Dashboard = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Welcome to your Dashboard</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-500 shadow-md rounded-lg p-4 text-black">
        <h3 className="font-bold text-lg">Active Projects</h3>
        <p>2 ongoing projects</p>
      </div>
      <div className="bg-green-500 shadow-md rounded-lg p-4 text-black">
        <h3 className="font-bold text-lg">Earnings</h3>
        <p>$500 this month</p>
      </div>
      <div className="bg-green-500 shadow-md rounded-lg p-4 text-black">
        <h3 className="font-bold text-lg">Pending Actions</h3>
        <p>3 tasks to review</p>
      </div>
    </div>
  </div>
);

// Job Categories Page Component
const JobCategories = () => {
  const categories = [
    { name: "Web Development", description: "Find full stack development jobs and opportunities.", jobsAvailable: 25 },
    { name: "Graphic Design", description: "Search for design-related gigs like logo and branding.", jobsAvailable: 15 },
    { name: "Content Writing", description: "Explore writing jobs such as copywriting, blog posts, and articles.", jobsAvailable: 10 },
    { name: "Digital Marketing", description: "Search for SEO, PPC, and social media management jobs.", jobsAvailable: 18 },
    { name: "Data Science", description: "Find jobs related to data analysis, machine learning, and AI.", jobsAvailable: 8 },
    { name: "Mobile Development", description: "Explore iOS and Android development jobs and opportunities.", jobsAvailable: 12 },
    { name: "Video Editing", description: "Find freelance video editing jobs for YouTube, commercials, and more.", jobsAvailable: 7 },
    { name: "Virtual Assistance", description: "Search for virtual assistant roles for administrative and support tasks.", jobsAvailable: 22 },
  ];

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Browse Job Categories</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="bg-green-500 shadow-md rounded-lg p-4 text-black">
            <h3 className="font-bold text-lg">{category.name}</h3>
            <p>{category.description}</p>
            <p className="text-sm mt-2">Jobs Available: {category.jobsAvailable}</p>
            <button
              onClick={() => alert(`Explore jobs in ${category.name}`)}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded"
            >
              Explore Jobs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
