import "tailwindcss/tailwind.css";
import Navbar from "@/components/NavBar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    skill: "",
    scope: "",
    month: "",
    experience: "",
    worktime: "",
    from: "",
    to: "",
    charge: "",
    link: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [token, setToken] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    setToken(storedToken);

    if (storedToken) {
      fetchJobs(storedToken);
    }
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");

    if (!token) {
      setResponseMessage("Authentication token is missing. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/client/Postjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        setResponseMessage("Job posted successfully!");
        setModalOpen(false);
        setFormData({
          title: "",
          skill: "",
          scope: "",
          month: "",
          experience: "",
          worktime: "",
          from: "",
          to: "",
          charge: "",
          link: "",
          content: "",
        });
        fetchJobs(token);
      } else {
        setResponseMessage(data.message || "Error posting job");
      }
    } catch (error) {
      setResponseMessage("Error posting job. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async (token) => {
    try {
      const res = await fetch("/api/client/GetuserPosts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setResponseMessage(`Error: ${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json();

      if (res.status === 200) {
        setJobs(data.jobs || []);
      } else {
        setResponseMessage(data.message || "Error fetching jobs");
      }
    } catch (error) {
      setResponseMessage("Error fetching jobs. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center pt-0">
      <Navbar />

      {/* Header Section */}
      <div className="flex justify-between items-center w-3/4 mt-8">
      <h1 className="text-gray-800 text-3xl font-bold">
            Welcome back ! <span className="text-orange-500">Vikram</span>
          </h1>
        <button
          onClick={openModal}
          className="px-7 py-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Post a Job
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 h-98 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
            <div className="bg-orange-500 border border-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">verify mail</h2>
            </div>


          {/* Card 2 */}
         
            <div className="bg-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">verify mobile</h2>
            </div>
       

          {/* Card 3 */}
          
            <div className="bg-orange-500 p-8 h-[18rem] rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-white mb-4">add bank detail</h2>
            </div>
         

      </div>
      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-auto max-h-[80vh] overflow-y-auto relative">
            <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl">
              X
            </button>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
                  Skills Required
                </label>
                <input
                  type="text"
                  id="skill"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="scope" className="block text-sm font-medium text-gray-700">
                  Project Scope
                </label>
                <input
                  type="text"
                  id="scope"
                  name="scope"
                  value={formData.scope}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                  Project Duration (Months)
                </label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience Required (Years)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="worktime" className="block text-sm font-medium text-gray-700">
                  Preferred Work Time
                </label>
                <input
                  type="text"
                  id="worktime"
                  name="worktime"
                  value={formData.worktime}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                  Budget Range (From)
                </label>
                <input
                  type="number"
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                  Budget Range (To)
                </label>
                <input
                  type="number"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="charge" className="block text-sm font-medium text-gray-700">
                  Hourly Charge (if applicable)
                </label>
                <input
                  type="number"
                  id="charge"
                  name="charge"
                  value={formData.charge}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                  Reference Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={isLoading}
              >
                {isLoading ? "Posting..." : "Post Job"}
              </button>
            </form>

            {responseMessage && (
              <div className="mt-4 text-center text-lg text-gray-700">
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Jobs Section */}
      <div className="mt-8 w-3/4">
        <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <div>
            {jobs.map((job) => (
              <div key={job.id} className="bg-gray-100 p-4 mb-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">Skills: {job.skill}</p>
                <p className="text-sm text-gray-600">Experience: {job.experience} years</p>
                <p className="text-sm text-gray-600">Budget: ${job.from} - ${job.to}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
