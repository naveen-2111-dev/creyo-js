// pages/index.js
import "tailwindcss/tailwind.css";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="bg-black h-screen flex flex-col items-center pt-0"> {/* Added pt-20 to push content below navbar */}
      <Navbar />
      {/* Main content */}
      <h1 className="text-green-500 text-3xl text-center mt-20">
        Welcome to My Next.js App!
      </h1>
    </div>
  );
}
