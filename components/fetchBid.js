import { useEffect, useState } from "react";

export default function FetchBid() {
  const [bids, setBids] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch("/api/freelancer/retrieveJob");
        if (!response.ok) {
          throw new Error(`Failed to fetch bids: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Bids Data:", data); // Debug log
        setBids(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBids();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/retriveUser");
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Users Data:", data); // Debug log
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getFirstNameByFreelancerId = (freelancerId) => {
    console.log("Freelancer ID to match:", freelancerId); // Debug log
    const user = users.find(
      (u) => u.freelancerProfile?.toLowerCase() === freelancerId?.toLowerCase()
    );
    if (!user) {
      console.warn(`No match found for Freelancer ID: ${freelancerId}`);
    }
    return user ? user.firstName : "Unknown";
  };

  const handleAcceptClick = (freelancerId) => {
    const user = users.find(
      (u) => u.freelancerProfile?.toLowerCase() === freelancerId?.toLowerCase()
    );
    if (user) {
      console.log(`Freelancer Email: ${user.email}`);
      alert(`Freelancer Email: ${user.email}`);
    } else {
      alert("No match found for this freelancer.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest Bids on your project</h2>
      {loading ? (
        <p className="text-gray-600">Loading data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <p className="text-gray-700">
                  <strong>Freelancer Name:</strong>{" "}
                  {getFirstNameByFreelancerId(bid.freelancerId)}
                </p>
                <p className="text-gray-700">
                  <strong>Job Name:</strong> {bid.jobName || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Amount:</strong> ${bid.amount}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => handleAcceptClick(bid.freelancerId)}
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
