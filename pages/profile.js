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

  // Check Login Status and Fetch Email from Token
  useEffect(() => {
    const fetchTokenData = () => {
      try {
        const token = Cookies.get("accessToken");
        if (token) {
          const decoded = jwtDecode(token); // Decode JWT to extract user details
          setMail(decoded.email); // Set email from the token
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchTokenData();
  }, []);

  // Fetch User Details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (mail) {
        try {
          const res = await fetch("/api/welcome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: mail }),
          });
          if (!res.ok) throw new Error("Failed to fetch user details");

          const data = await res.json();
          setName(data.data.name);
          setRole(data.data.role);
          setId(data.data.id);  // Set the _id from the response
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserDetails();
  }, [mail]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Always Present */}
      <Navbar />
      
      {/* Profile Content */}
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col items-start space-y-4">
            <div>
              <span className="font-semibold">Name:</span> {name || "Loading..."}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {mail || "Loading..."}
            </div>
            <div>
              <span className="font-semibold">Role:</span> {role || "Loading..."}
            </div>
            <div>
              <span className="font-semibold">User ID:</span> {id || "Loading..."} {/* Display the _id */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
