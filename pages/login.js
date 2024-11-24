import Login from "@/db/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const HandleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(email, pass);
      const res = await Login(email, pass);
      localStorage.setItem("AccessToken", res);
      router.push("/Hero");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen text-white bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-800 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPass(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-800 border-none rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="/Forget" className="text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            onClick={HandleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-6 flex  justify-center gap-1 text-sm text-center text-gray-600">
          Don't have an account?
          <Link href="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
