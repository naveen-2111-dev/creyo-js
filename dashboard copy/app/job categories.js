"use client"; // Add this line at the very top of your page.js file

import React from "react";

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

export default JobCategories;
