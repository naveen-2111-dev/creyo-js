import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";

const JobsComponent = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const [jobTitle, setJobTitle] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [milestone, setMilestone] = useState('');
  const [whyEligible, setWhyEligible] = useState('');
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const tokens = Cookies.get("accessToken");
    setToken(tokens);

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/jobs/retrieveJob');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const jobs = await response.json();
        const job = jobs.find(job => job._id === roomId);

        if (job) {
          setJobTitle(job.title);
          setJobDescription(job.description);
        } else {
          setError('Job not found for the given roomId');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchJobs();
    }

    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/user/role');
        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }

        const role = await response.json();
        setUserRole(role);
      } catch (err) {
        console.error('Error fetching user role:', err.message);
      }
    };

    fetchUserRole();
  }, [roomId]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!bidAmount || !milestone || !whyEligible) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/freelancer/joinJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          Amount: bidAmount,
          milestone,
          whyEligible,
          job: roomId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBidAmount('');
        setMilestone('');
        setWhyEligible('');
        setError(null);
        alert('Your bid has been submitted!');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred while submitting the bid');
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  const descriptionToDisplay = jobDescription
    ? typeof jobDescription === 'object'
      ? jobDescription.content
      : jobDescription
    : 'No description available.';

  if (userRole === 'client') {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hi Client</h1>
          <p className="text-lg text-gray-600">Add client-specific interface here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{jobTitle || 'No job found'}</h1>
        <p className="text-lg text-gray-700 mb-6">{descriptionToDisplay}</p>

        <form onSubmit={handleBidSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="space-y-2">
            <label htmlFor="bidAmount" className="block text-sm font-semibold text-gray-700">Enter your bid amount:</label>
            <input
              id="bidAmount"
              type="number"
              min="1"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              placeholder="Enter bid amount"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="milestone" className="block text-sm font-semibold text-gray-700">Milestone:</label>
            <input
              id="milestone"
              type="text"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              placeholder="Enter milestone"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="whyEligible" className="block text-sm font-semibold text-gray-700">Why are you eligible for this job?</label>
            <textarea
              id="whyEligible"
              value={whyEligible}
              onChange={(e) => setWhyEligible(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2"
              placeholder="Explain why you're eligible"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full border border-black text-black py-2 rounded-md hover:bg-orange-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Bid
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobsComponent;
