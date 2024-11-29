import { useState } from "react";
import "tailwindcss/tailwind.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Password() {
  const [showPassword, setShowPassword] = useState(false);
  const [newpassword, setNewpassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const data = localStorage.getItem("email");
      await fetch("api/Reset", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          newpassword: newpassword,
          confirmpassword: confirm,
          email: data,
        }),
      });
      localStorage.removeItem("email");
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-md p-6 bg-black text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-extrabold text-center mb-6">
          Reset Password
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="mb-5">
            <label htmlFor="new-password" className="block text-sm font-medium">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="new-password"
              placeholder="Enter new password"
              className="mt-1 w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onChange={(e) => setNewpassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm new password"
              className="mt-1 w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-2 px-4 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center justify-center p-2 text-xl text-green-600 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
