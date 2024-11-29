import OtpSaver from "@/db/otp";
import Verify from "@/db/verify";
import { useRef, useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";

export default function ResetPage() {
  const otpRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setemail] = useState("");
  const [sent, setSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const router = useRouter();

  const handleInput = (index, event) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");
    await OtpSaver(email);
    setSent(true);
  };

  const handleVerify = async (e) => {
    e?.preventDefault();

    try {
      await Verify(email, otp, router);
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (sent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setSent(false);
      setTimeLeft(300);
    }

    return () => clearInterval(timer);
  }, [sent, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white  font-sans">
      <div className="w-full max-w-md p-8 bg-white text-black rounded-lg border border-black shadow-sm  ">
        <h1 className="text-2xl font-bold text-center mb-6">
          Verify Your Email
        </h1>
        <p className="text-sm text-center text-gray-400 mb-6">
          Enter your email address and the OTP sent to your email to verify your
          identity.
        </p>
        <form>
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
              className="mt-1 w-full px-4 py-2 bg-white border border-black text-black rounded-lg "
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
                    className="w-12 h-12 text-center text-lg font-bold bg-white border border-black rounded-lg focus:outline-none"
                  />
                ))}
            </div>
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 text-black font-semibold bg-white border border-black  rounded-lg hover:bg-black transition hover:text-white "
            onClick={async () => {
              if (!sent) {
                await handleSubmit(new Event("submit"));
              } else {
                await handleVerify(new Event("submit"));
              }
            }}
          >
            {sent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          {sent ? (
            <p>
              You can resend the OTP in{" "}
              <span className="font-medium text-green-600">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <p>
              Didn't receive the OTP?{" "}
              <a
                href="/resend-otp"
                className="font-medium text-black hover:text-gray-500"
                onClick={handleSubmit}
              >
                Resend OTP
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
