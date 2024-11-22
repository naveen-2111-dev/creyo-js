"use client"

import { useAppContext } from "@/context";
import React from "react";

const Welcome = () => {
  const {state} = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-4xl font-bold text-green-500 mb-4">
        {state} Our App!
      </h1>
      <p className="text-lg text-gray-600">
        We’re glad to have you here. Enjoy exploring!
      </p>
    </div>
  );
};

export default Welcome;
