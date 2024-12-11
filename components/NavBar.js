import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
// import "tailwindcss/tailwind.css";
import Cookies from "js-cookie";
import Image from "next/image";
import CreyoLogo from "../public/images/CreyoLogo.png";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileCardVisible, setProfileCardVisible] = useState(false);
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter()

  const toggleProfileCard = (e) => {
    e.preventDefault();
    setProfileCardVisible(!isProfileCardVisible);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const token = Cookies.get("accessToken");
        if (token) {  
          const decoded = jwtDecode(token);
          setMail(decoded.email);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoggedIn && mail) {
        try {
          const res = await fetch("/api/welcome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: mail }),
          });
          const data = await res.json();
          // console.log(data);
          setName(data.data.name);
          setRole(data.data.role);

          console.log(data.data.name)
          console.log(data.data.role)

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();

  }, [isLoggedIn, mail]);

  const logoClickHandler = (e) => {
    e.preventDefault();
    if (isLoggedIn && role) {
      // Redirect to the dashboard based on the user's role
      window.location.href = `/dashboard/${role}`;
    } else {
      // Redirect to the homepage if the user is not logged in
      window.location.href = "/";
    }
  };
  const handleLogout = () => {
    Cookies.remove("accessToken"); // Clear the token
    setIsLoggedIn(false); // Update the state
    router.push("/"); // Navigate to the homepage or desired page
  };

  return (
    <nav className="bg-white border-b border-[#b5b5b5] text-black w-full mx-auto p-5 px-10 flex items-center justify-between relative">
      {/* Logo and Navigation Links */}
      <div className="flex items-center space-x-2">
        {/* Logo */}
        <div className="flex items-center h-10 m-0">
          {/* Logo */}
          <Link href="/" onClick={logoClickHandler}>
            <Image
              src={CreyoLogo}
              alt="CREYO Logo"
              width={180}
              height={40}
              objectFit="contain"
              className="mt-5"
            />
          </Link>
        </div>
      </div>

      {/* Conditional Rendering for Login Status */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            {/* Search Bar */}
            <div className="relative w-[500px]">
              <input
                type="text"
                placeholder="Find your next gig here!"
                className="w-full p-2 pl-12 rounded-3xl text-black bg-white border border-gray-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>

            {/* Profile Icon */}
            <div className="relative">
              <button onClick={toggleProfileCard} className="group">
                <div className="w-16 h-16 bg-gray-300 border-2 border-white rounded-full flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-orange-500 transition">
                  {/* Placeholder SVG for now; replace with an <img> tag for the profile picture */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"
                    />
                  </svg>
                </div>
              </button>


              {/* Profile Card */}
              {isProfileCardVisible && (
                <div className="absolute right-0 bg-white text-black rounded-lg shadow-lg w-64 p-4 mt-2 z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{name}</h2>
                      <p className="text-sm text-gray-500">{role}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center text-left px-3 py-2 text-sm hover:bg-black hover:text-white rounded-lg cursor-pointer"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/messages"
                    className="flex items-center text-left px-3 py-2 text-sm hover:bg-black hover:text-white rounded-lg cursor-pointer"
                  >
                    Message
                  </Link>
                  <div
                    className="flex items-center text-left px-3 py-2 text-sm hover:bg-red-500 hover:text-white rounded-lg cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Login Button */}
            {/* Signup Button */}
            <Link href="/signup">
              <button className="px-6 py-2  text-white bg-[#FF8800]  font-bold text-lg rounded-lg hover:bg-white hover:text-black hover:border hover:border-black transition-colors">
                Get Started
              </button>
            </Link>
            {/* <Link href="/login">
              <button className="px-6 py-2 bg- text-black border border-black font-bold text-lg rounded-lg hover:bg-black hover:text-white transition-colors">
                Login
              </button>
            </Link> */}
          </>
        )}
      </div>
    </nav>
  );
}
