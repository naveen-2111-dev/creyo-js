import { useState } from "react";
import { useRouter } from "next/navigation";
import signupUser from "@/db/SignUp";
import "tailwindcss/tailwind.css";
import Link from "next/link";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !country) {
      setError("All fields are required.");
      return;
    }

    try {
      await signupUser(firstName, las, email, password, country);
      router.push("/login");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Section - Video Background (Visible on mobile and desktop) */}
      <div className="relative hidden lg:block w-1/2 h-full">
        <video
          src="/images/signup.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
          type="video/mp4"
          disablePictureInPicture
          style={{ pointerEvents: "none" }}
        />


      </div>

      {/* Right Section - Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-4 bg-white z-10 relative">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-10 rounded-lg shadow-sm backdrop-blur-md">
          <h2 className="text-center text-xl font-semibold mb-6">Welcome to Creyo</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-md placeholder-gray-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-md placeholder-gray-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-md placeholder-gray-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-md placeholder-gray-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="block mb-2">
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select your country
                </option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="Brazil">Brazil</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition font-medium"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
