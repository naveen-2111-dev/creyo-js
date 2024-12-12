import Head from 'next/head';
import NavBar from '../components/NavBar'; // Optional if you have a NavBar component
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const StartWork = () => {
  const [jobs, setJobs] = useState([]); // State to hold the jobs data
  const [timers, setTimers] = useState({}); // State to manage timers for jobs
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs/retrieveJob');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();

        // Initialize timers for each job
        const initialTimers = data.reduce((acc, job) => {
          acc[job._id] = 60; // Set each job's timer to 60 seconds
          return acc;
        }, {});
        
        setJobs(data); // Set the fetched jobs data to the state
        setTimers(initialTimers); // Initialize timers
      } catch (err) {
        setError(err.message); // Set any error to the state
      } finally {
        setLoading(false); // Set loading state to false once data is fetched
      }
    };

    fetchJobs(); // Call the function to fetch the data
  }, []); // Empty dependency array to fetch data only once when the component mounts

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        Object.keys(updatedTimers).forEach((jobId) => {
          if (updatedTimers[jobId] > 0) {
            updatedTimers[jobId] -= 1; // Decrease timer by 1 second
          }
        });
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="ml-4 text-lg font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="text-red-500 text-2xl font-bold mb-2">Error</div>
          <p className="text-gray-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const handleStartBidding = (jobId) => {
    // Navigate to the job's bidding room page with _id
    router.push(`/room/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar /> {/* Optional, if you have a NavBar */}

      {/* Jobs Section */}
      <div className="container mx-auto p-4 mt-12">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Available Jobs
        </h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Job ID:</span> {job._id}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      job.status === "open"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Project Duration:</span>{" "}
                  {job.month} months
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Experience Required:</span>{" "}
                  {job.experience} years
                </p>
                <div className="mb-4">
                  <span className="font-semibold text-gray-600">Skills:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skill.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-700 font-semibold">
                    Budget: ${job.budget.from} - ${job.budget.to}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-700 font-semibold">Time Left: {timers[job._id]}s</p>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                  onClick={() => handleStartBidding(job._id)}
                  disabled={timers[job._id] === 0} // Disable button if timer is 0
                >
                  {timers[job._id] > 0 ? "Start Bidding" : "Time Expired"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No jobs available. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
};

export default StartWork;