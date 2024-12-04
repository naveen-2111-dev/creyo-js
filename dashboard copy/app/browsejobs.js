import { useState } from "react";

const jobsData = [
  {
    id: 1,
    title: "Web Developer for E-commerce Website",
    category: "Programming / Web Development",
    budget: "$1,500 - $2,500",
    location: "Remote",
    description: "Experienced developer to design an e-commerce site using Shopify. Proficiency in HTML, CSS, and JavaScript is required.",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Graphic Designer for Branding Project",
    category: "Design",
    budget: "$500 - $1,000",
    location: "Remote",
    description: "Create a branding package including logos, business cards, and social media designs.",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Content Writer for Blog Posts on Tech",
    category: "Writing / Content Creation",
    budget: "$200 per article",
    location: "Remote",
    description: "Write well-researched, SEO-focused articles for a tech blog.",
    posted: "3 days ago",
  },
];

const BrowseJobs = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = jobsData.filter((job) =>
      job.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Freelance Jobs</h1>

      {/* Search Filters */}
      <form
        className="flex flex-col md:flex-row gap-4 items-center bg-gray-100 p-4 rounded-md"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Enter keywords (e.g., Web Development)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded-md flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Search
        </button>
      </form>

      {/* Job Listings */}
      <div className="mt-6">
        {filteredJobs.length ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 rounded-md p-4 mb-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.category}</p>
              <p className="font-bold">{job.budget}</p>
              <p>{job.location}</p>
              <p className="text-gray-500 text-sm">{job.posted}</p>
              <p className="mt-2">{job.description}</p>
              <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
