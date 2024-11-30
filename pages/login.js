import Login from "@/db/login";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  // const HandleLogin = async (e) => {
  //   try {
  //     e.preventDefault();
  //     console.log(email, pass);
  //     const res = await Login(email, pass);
  //     localStorage.setItem("AccessToken", res);
  //     router.push("/dashboard");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const HandleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await Login(email, pass);
      Cookies.set("accessToken", res);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen text-black bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
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
              className="w-full mt-1 p-2 bg-white border border-black text-black rounded-md "
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
              className="w-full mt-1 p-2 bg-white border border-black text-black rounded-md "
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 bg-white border border-black  rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="/Forget" className="text-black hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-white border border-black text-black py-2 px-4 rounded-md hover:bg-black hover:text-white transition"
            onClick={HandleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-6 flex  justify-center gap-1 text-sm text-center text-gray-600">
          Don't have an account?
          <Link href="/signup" className="text-black hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
