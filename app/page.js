"use client"

import { useAppContext } from "@/context";
import React from "react";
import { useRouter } from "next/navigation";  // Use next/navigation for app directory

const Welcome = () => {
  const { state } = useAppContext();
  const router = useRouter(); // Initialize useRouter from next/navigation

  const handleNavigate = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-4xl font-bold text-green-500 mb-4">
        {state} , Welcome to Creyo
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        We’re glad to have you here. Enjoy exploring!
      </p>
      
      {/* Sign Up Button */}
      <button
        onClick={handleNavigate}
        className="px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition-colors"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Welcome;
