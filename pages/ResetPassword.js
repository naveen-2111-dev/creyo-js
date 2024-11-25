import OtpSaver from "@/db/otp";
import { useRef, useState } from "react";
import "tailwindcss/tailwind.css";

export default function ResetPage() {
  const otpRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setemail] = useState("");
  const [sent, setSent] = useState(false);

  const handleInput = (index, event) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !event.target.value) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleInputChange = (e) => {
    setemail(e.target.value);
    console.log(e.target.value); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await OtpSaver(email);
    setSent(!sent);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 font-sans">
      <div className="w-full max-w-md p-8 bg-black text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-extrabold text-center mb-6">
          Verify Your Email
        </h1>
        <p className="text-sm text-center text-gray-400 mb-6">
          Enter your email address and the OTP sent to your email to verify your
          identity.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="otp" className="block text-sm font-medium">
              One-Time Password (OTP)
            </label>
            <div className="flex space-x-2 mt-1">
              {Array(6)
                .fill("")
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(event) => handleInput(index, event)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-12 h-12 text-center text-lg font-bold bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          >
            {sent?"verify otp":"send otp"}
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <p>
            Didn't receive the OTP?
            <a
              href="/resend-otp"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
