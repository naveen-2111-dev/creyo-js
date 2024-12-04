"use client"; // This line should be the first line in the file
import React, { useState } from "react";

const PostJob = () => {
  // State for form data
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate posting the job (this can be an API call in a real application)
    console.log("Job Posted:", jobDetails);
    alert("Job posted successfully!");
    // Reset form
    setJobDetails({
      title: "",
      description: "",
      category: "",
      budget: "",
      deadline: "",
    });
  };

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="font-semibold">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobDetails.title}
            onChange={handleInputChange}
            placeholder="Enter job title"
            className="w-full p-3 rounded-md bg-gray-800 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-semibold">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={jobDetails.description}
            onChange={handleInputChange}
            placeholder="Describe the job details"
            className="w-full p-3 rounded-md bg-gray-800 text-white"
            rows="5"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="font-semibold">
            Job Category
          </label>
          <select
            id="category"
            name="category"
            value={jobDetails.category}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-gray-800 text-white"
            required
          >
            <option value="">Select a category</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Data Science">Data Science</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Virtual Assistance">Virtual Assistance</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="font-semibold">
            Budget ($)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={jobDetails.budget}
            onChange={handleInputChange}
            placeholder="Enter budget"
            className="w-full p-3 rounded-md bg-gray-800 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deadline" className="font-semibold">
            Job Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={jobDetails.deadline}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-gray-800 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md bg-green-600 text-white font-semibold"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
