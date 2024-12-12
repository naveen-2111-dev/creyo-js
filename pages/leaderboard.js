import { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";
import Navbar from '@/components/NavBar'; // Make sure the path is correct

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(''); // Track selected skill
  const [filteredLeaders, setFilteredLeaders] = useState([]);

  useEffect(() => {
    // Mock data or you can replace this with a fetch request to your API
    const fetchedLeaders = [
      { rank: 1, name: 'John Doe', score: 1500, skill: 'Frontend Dev' },
      { rank: 2, name: 'Jane Smith', score: 1400, skill: 'Backend Dev' },
      { rank: 3, name: 'Sam Johnson', score: 1300, skill: 'Fullstack' },
      { rank: 4, name: 'Emily Davis', score: 1200, skill: 'Data Science' },
      { rank: 5, name: 'Chris Lee', score: 1100, skill: 'Machine Learning' },
    ];

    setLeaders(fetchedLeaders);
    setFilteredLeaders(fetchedLeaders);  // Initially show all leaders
  }, []);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleFilterSubmit = () => {
    if (selectedSkill === '') {
      setFilteredLeaders(leaders);  // Show all leaders if no skill is selected
    } else {
      const filtered = leaders.filter(leader => leader.skill === selectedSkill);
      setFilteredLeaders(filtered);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar /> {/* Add the Navbar component at the top */}
      
      <div className="flex flex-col justify-between flex-1 p-6">
        <h2 className="text-5xl font-bold text-left text-gray-700 mb-6 ml-4 mt-4">Leaderboard</h2>

        {/* Dropdown Bar - Left Side with Apply Button to the Right */}
        <div className="flex mb-6 items-center">
          <div className="w-1/2 h-20 flex flex-row mr-4">
            <select
              className="bg-white text-gray-600 py-2 px-4 border rounded-lg w-full"
              value={selectedSkill}
              onChange={handleSkillChange}
            >
              <option value="">All Skills</option>
              <option value="Frontend Dev">Frontend Dev</option>
              <option value="Backend Dev">Backend Dev</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Mobile Development">Mobile Development</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleFilterSubmit}
            className="ml-4 py-3 px-6 bg-blue-600 text-white rounded-lg text-lg"
          >
            Apply Filter
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto flex-1 mt-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-blue-600 text-2xl font-semibold">Rank</th>
                <th className="px-6 py-3 text-left text-blue-600 text-2xl font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-blue-600 text-2xl font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaders.map((leader) => (
                <tr key={leader.rank} className="border-b">
                  <td className="px-6 py-4 text-black text-xl">{leader.rank}</td>
                  <td className="px-6 py-4 text-black text-xl">{leader.name}</td>
                  <td className="px-6 py-4 text-black text-xl">{leader.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

