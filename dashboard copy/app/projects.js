"use client"; // This line should be the first line in the file
import React, { useState } from "react";

const Projects = () => {
  // Sample data for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Web Development for E-commerce",
      status: "Active",
      description: "Building a full-stack e-commerce website with payment gateway integration.",
      dueDate: "2024-12-01",
      budget: "$5000",
    },
    {
      id: 2,
      title: "Mobile App for Fitness Tracking",
      status: "Completed",
      description: "Developed a mobile app for fitness tracking with integrated health APIs.",
      dueDate: "2024-10-15",
      budget: "$3000",
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      status: "Pending",
      description: "Writing articles and blog posts for a digital marketing agency.",
      dueDate: "2024-11-30",
      budget: "$1200",
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  // Handle selecting a project
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="flex">
        {/* Left Side: Project List */}
        <div className="w-1/3 bg-gray-800 p-4 rounded-lg mr-4">
          <h3 className="font-semibold text-lg mb-4">Active Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg"
              >
                <div className="font-semibold">{project.title}</div>
                <div className="text-sm text-gray-400">{project.status}</div>
                <div className="text-xs text-gray-500">{project.dueDate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Project Details */}
        <div className="w-2/3 bg-gray-800 p-4 rounded-lg">
          {selectedProject ? (
            <>
              <h3 className="font-semibold text-xl mb-4">{selectedProject.title}</h3>
              <div className="text-sm text-gray-400 mb-2">
                <strong>Status: </strong> {selectedProject.status}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                <strong>Due Date: </strong> {selectedProject.dueDate}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                <strong>Budget: </strong> {selectedProject.budget}
              </div>
              <div className="text-white">
                <h4 className="font-semibold mb-2">Description:</h4>
                <p>{selectedProject.description}</p>
                {/* You can add more project-related actions here, such as editing or updating the project */}
                <div className="mt-4">
                  <button className="w-full py-2 px-4 bg-green-600 text-white rounded-md">
                    Edit Project
                  </button>
                  <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md mt-2">
                    Delete Project
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400">
              <p>Select a project to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
