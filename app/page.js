"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-black mb-1">
        Welcome to checking
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        We’re glad to have you here. Enjoy exploring!
      </p>

      <button
        onClick={handleNavigate}
        className="px-6 py-3 bg-white text-black border border-black font-bold text-lg rounded-full hover:bg-black hover:text-white transition-colors"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Welcome;
