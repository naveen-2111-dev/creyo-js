import "tailwindcss/tailwind.css";

const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-semibold">Client Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600">
          This is the Client Dashboard.
        </p>
      </div>
    </div>
  );
};

export default ClientDashboard;
