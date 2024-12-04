"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Survey Page Component
export default function SurveyPage() {
  const router = useRouter(); // Initialize useRouter for page redirection
  const [surveyData, setSurveyData] = useState({
    skills: [],
    availability: "",
    workType: "",
    experienceLevel: "",
  });

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      // For checkbox group, toggle the selected value
      setSurveyData((prevData) => {
        const updatedSkills = prevData.skills.includes(value)
          ? prevData.skills.filter((skill) => skill !== value)
          : [...prevData.skills, value];
        return { ...prevData, skills: updatedSkills };
      });
    } else {
      // For other inputs like radio buttons or text
      setSurveyData({ ...surveyData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can save the surveyData to a backend or state management

    // For now, redirect to the dashboard
    router.push("/dashboard"); // Redirect to the dashboard after survey completion
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-green-500 p-8 rounded-lg w-3/4 max-w-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Freelancer Survey</h2>
        <form onSubmit={handleSubmit}>
          {/* Skills Question */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What are your skills?</h3>
            <div className="flex flex-wrap gap-4">
              {["Web Development", "Graphic Design", "Content Writing", "SEO", "Video Editing", "Mobile Development"].map((skill) => (
                <label key={skill} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={surveyData.skills.includes(skill)}
                    onChange={handleChange}
                    name="skills"
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          {/* Availability Question */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How many hours can you work per week?</h3>
            <input
              type="number"
              name="availability"
              value={surveyData.availability}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border bg-black text-white"
              placeholder="Enter hours per week"
              min="1"
            />
          </div>

          {/* Work Type Question */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What type of work do you prefer?</h3>
            <div className="flex gap-4">
              {["Full-time", "Part-time", "Freelance"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={type}
                    name="workType"
                    checked={surveyData.workType === type}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level Question */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is your experience level?</h3>
            <div className="flex gap-4">
              {["Beginner", "Intermediate", "Expert"].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={level}
                    name="experienceLevel"
                    checked={surveyData.experienceLevel === level}
                    onChange={handleChange}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
            >
              Submit and Go to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
