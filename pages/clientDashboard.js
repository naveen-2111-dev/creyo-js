import { useRouter } from "next/navigation";
import "tailwindcss/tailwind.css";

const ClientDashboard = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Enter Company Name</h1>
        <input
          type="text"
          placeholder="Enter company name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => alert("Individual selected")}
          >
            Individual
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => alert("Group selected")}
          >
            Group
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            onClick={() => alert("2-5 selected")}
          >
            2-5
          </button>
        </div>
        <button
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          onClick={() => router.push("/clientdashboard") }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClientDashboard;
