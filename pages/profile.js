import Link from 'next/link';
import "tailwindcss/tailwind.css"

export default function Profile() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        {/* Profile Header */}
        <div className="flex justify-center mb-6">
          <img 
            src="/path/to/your/profile-picture.jpg" 
            alt="Profile Picture" 
            className="w-32 h-32 rounded-full border-4 border-green-500"
          />
        </div>

        {/* User Information */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
          <p className="text-lg text-gray-500">Web Developer</p>
          <p className="text-sm text-gray-400">johndoe@example.com</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Link href="/edit-profile">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Edit Profile
            </button>
          </Link>
          <Link href="/logout">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
