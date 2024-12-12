import Head from 'next/head';
import NavBar from '../components/NavBar'; // Optional if you have a NavBar component
import 'tailwindcss/tailwind.css';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const StartWork = () => {
  const [jobs, setJobs] = useState([]); // State to hold the jobs data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const [token, setToken] = useState(''); // State for token

  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchJobs = async () => {
      console.log('Fetching jobs with token:', token);  // Debugging token value
      try {
        const response = await fetch('/api/client/GetuserPost');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
        console(data)
      } catch (err) {
        setError(err.message);
        console.error(err); // Log the error for more details
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [token]);
  // Empty dependency array to fetch data only once when the component mounts
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Jobs Section */}
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Jobs</h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id} // Use the unique _id for each job
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition "
              >
                <p className="text-sm text-gray-500">Job ID: {job._id}</p> {/* Display the _id before title */}
                <h3 className="text-lg font-semibold mt-2">{job.title}</h3>
                <p className="text-gray-700 mt-2">Skills Required: {job.skill}</p>
                <p className="text-gray-700 mt-2">Project Duration: {job.month} months</p>
                <p className="text-gray-700 mt-2">Experience Required: {job.experience} years</p>
                <p className="text-gray-700 mt-2">Budget: ${job.budget.from} - ${job.budget.to}</p>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  onClick={() => handleStartBidding(job._id)} // Call the function with the job's _id
                >
                  Start Bidding
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs available.</p> // Display message if no jobs are fetched
        )}
      </div>
    </div>
  );
};

export default StartWork;