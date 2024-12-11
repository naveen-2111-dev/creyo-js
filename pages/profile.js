import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Assuming jwt-decode is installed
import Navbar from "../components/NavBar"; // Adjust the path as per your project structure

export default function Profile() {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");  // State for the _id
  const [loading, setLoading] = useState(true); // Loading state for the fetch
  const [error, setError] = useState(null); // Error state for fetch failure
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  // Fetch Token Data and User Details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");
        console.log("Access Token:", token);  // Log the access token to see if it exists

        if (token) {
          const decoded = jwtDecode(token); // Decode JWT to extract user details
          setMail(decoded.email); // Set email from the token
          console.log("Decoded Token:", decoded);  // Log the decoded token

          // Fetch user details from /api/welcome
          const res = await fetch("/api/welcome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: decoded.email }), // Send email to get user details
          });

          if (!res.ok) throw new Error("Failed to fetch user details");
          
          const data = await res.json();
          setName(data.data.name);
          setRole(data.data.role);
          setId(data.data.id);  // Set the _id from the response
        } else {
          setError("No access token found in cookies.");
        }
      } catch (error) {
        setError("Error fetching user data: " + error.message); // Update the error state
      }
    };

    fetchUserData();
  }, []); // This runs only once when the component mounts

  // Fetch Freelancer Profile and compare createdBy
  useEffect(() => {
    const fetchFreelancerProfile = async () => {
      if (mail && id) {
        try {
          const res = await fetch("/api/freelancer/retrieveProfile", {
            method: "GET", // Use GET method for retrieving freelancer profiles
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) throw new Error("Failed to fetch freelancer profile");

          const data = await res.json();
          console.log("Freelancer Profile Data:", data); // Log all the profile data

          // Check if the response is an array
          if (Array.isArray(data)) {
            console.log("Freelancer Profile is an array. First profile createdBy:", data[0]?.createdBy);
            const matchingProfile = data.find(profile => profile.createdBy === id);

            if (matchingProfile) {
              console.log("Matching freelancer profile found:", matchingProfile);
              setUserDetails(matchingProfile); // Set the matched profile for display
            } else {
              setError("No matching freelancer profile found.");
            }
          } else {
            setError("Unexpected response format. Expected an array.");
          }
        } catch (error) {
          setError("Error fetching freelancer profile: " + error.message);
        }
      }
    };

    // Only fetch freelancer profile if mail and id are set
    if (mail && id) {
      fetchFreelancerProfile();
    }
  }, [mail, id]); // Trigger only when mail or id changes

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Your Navbar component */}
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold mb-4">Freelancer Profile</h1>

          {/* Show loading or error message */}
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : userDetails ? (
            <div className="space-y-4">
              <div><strong>ID:</strong> {userDetails._id}</div>
              <div><strong>Name:</strong> {userDetails.name}</div>
              <div><strong>Pronoun:</strong> {userDetails.pronoun}</div>
              <div><strong>Experience:</strong> {userDetails.experience}</div>
              <div><strong>Goal:</strong> {userDetails.goal}</div>
              <div><strong>Field of Work:</strong> {userDetails.fieldOfWork}</div>
              <div><strong>Role:</strong> {userDetails.role}</div>
              <div><strong>Location:</strong> {userDetails.location}</div>
              <div><strong>Payment:</strong> {userDetails.payment}</div>
              <div><strong>Bio:</strong> {userDetails.bio ? JSON.stringify(userDetails.bio) : "N/A"}</div>
              <div><strong>Created By:</strong> {userDetails.createdBy}</div>
              <div><strong>Created At:</strong> {userDetails.createdAt}</div>
              <div><strong>Date of Birth:</strong> {new Date(userDetails.dob).toLocaleDateString()}</div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
