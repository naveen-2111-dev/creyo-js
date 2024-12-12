import { useEffect, useState } from "react";

export default function FetchBid() {
  const [bids, setBids] = useState([]);
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
        setBids(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className="container mx-auto p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest Bids on you project</h2>
      {loading ? (
        <p className="text-gray-600">Loading bids...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bids.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-700">
                <strong>Job ID:</strong> {bid.job}
              </p>
              <p className="text-gray-700">
                <strong>Freelancer ID:</strong> {bid.freelancerId}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> ${bid.amount}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No bids available.</p>
      )}
    </div>
  );
}
