import { useRouter } from 'next/router'
// import "tailwindcss/tailwind.css"
import { useState, useEffect } from 'react'
import Navbar from '@/components/NavBar'

const SearchPage = () => {
    const router = useRouter()
    const { query } = router.query // Access the query parameter from the URL

    // Decode the query and replace hyphens with spaces
    const decodedQuery = query ? query.replace(/-/g, ' ') : ''

    // Capitalize the first letter of the decoded query
    const capitalizeFirstLetter = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
        return ''
    }

    const capitalizedQuery = capitalizeFirstLetter(decodedQuery)

    // Define different result counts for profiles and jobs
    const profileCount = 9 // Number of profiles to show
    const jobCount = 2 // Number of jobs to show

    // State for managing the active tab ("Profiles" or "Jobs")
    const [activeTab, setActiveTab] = useState('profiles')
    const [skillsData, setSkillsData] = useState([])
    const [descriptions, setDescriptions] = useState([])

    // Generate random skills and descriptions for each profile after the component is mounted (client-side only)
    useEffect(() => {
        const generateProfilesData = () => {
            const profiles = Array.from({ length: profileCount }).map(() => {
                const skillCount = Math.floor(Math.random() * 5) + 1;
                const skills = Array.from({ length: skillCount }).map((_, skillIndex) => `Skill ${skillIndex + 1}`);
                const description = `This is a brief description for profile ${Math.floor(Math.random() * 100) + 1}.`; // Random description
                return { skills, description };
            });
            setSkillsData(profiles.map(profile => profile.skills));
            setDescriptions(profiles.map(profile => profile.description));
        }

        generateProfilesData();
    }, []);

    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar />
            {/* Display the capitalized query at the top center */}
            <div className="flex justify-center mt-8">
                <h1 className='text-4xl font-bold text-black text-center'>
                    {capitalizedQuery}
                </h1>
            </div>

            {/* Description below the title */}
            <div className="flex flex-col items-center justify-center mt-4">
                <p className='text-lg text-gray-600 text-center'>
                    Here are the results for your search query: <strong>{capitalizedQuery}</strong>
                </p>
            </div>

            {/* Tab Buttons */}
            <div className="mt-8 flex justify-center space-x-8">
                <button
                    onClick={() => setActiveTab('profiles')}
                    className={`text-lg font-semibold py-2 px-4 rounded-lg ${activeTab === 'profiles' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                >
                    Profiles
                </button>
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`text-lg font-semibold py-2 px-4 rounded-lg ${activeTab === 'jobs' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                >
                    Jobs
                </button>
            </div>

            {/* Container for the results and the filter section */}
            <div className="mt-8 flex w-full px-4">
                {/* Filter Section (1/4 width) */}
                <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter Options</h2>
                    {/* Conditionally render filter options based on active tab */}
                    {activeTab === 'profiles' ? (
                        <div className="space-y-4">
                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a skill</option>
                                <option value="skill1">Skill 1</option>
                                <option value="skill2">Skill 2</option>
                                <option value="skill3">Skill 3</option>
                                {/* Add more options dynamically as needed */}
                            </select>

                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a location</option>
                                <option value="location1">Location 1</option>
                                <option value="location2">Location 2</option>
                                <option value="location3">Location 3</option>
                                {/* Add more options dynamically as needed */}
                            </select>

                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a category</option>
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                <option value="category3">Category 3</option>
                                {/* Add more options dynamically as needed */}
                            </select>

                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a fluency level</option>
                                <option value="fluent">Fluent</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="beginner">Beginner</option>
                                {/* Add more options dynamically as needed */}
                            </select>

                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a language</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                                <option value="german">German</option>
                                {/* Add more options dynamically as needed */}
                            </select>
                        </div>



                    ) : (
                        <div className="space-y-4">
                            <select className="w-full p-2 bg-gray-100 border rounded-md">
                                <option value="">Filter by Category</option>
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                <option value="category3">Category 3</option>
                            </select>
                            <select className="w-full p-2 bg-gray-100 border rounded-md">
                                <option value="">Filter by Client Location</option>
                                <option value="location1">Location 1</option>
                                <option value="location2">Location 2</option>
                                <option value="location3">Location 3</option>
                            </select>
                            <select className="w-full p-2 bg-gray-100 border rounded-md">
                                <option value="">Filter by Client Timezone</option>
                                <option value="timezone1">Timezone 1</option>
                                <option value="timezone2">Timezone 2</option>
                                <option value="timezone3">Timezone 3</option>
                            </select>
                            <select className="w-full p-2 bg-gray-100 border rounded-md">
                                <option value="">Filter by Experience Level</option>
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                            </select>
                        </div>

                    )}
                </div>

                {/* Results Section (3/4 width) */}
                <div className="w-3/4 pl-4">
                    <ul className="space-y-4">
                        {/* Dynamically generating result items based on active tab */}
                        {activeTab === 'profiles' ? (
                            Array.from({ length: profileCount }).map((_, index) => (
                                <li key={index} className="w-full h-96 bg-gray-200 rounded-lg shadow-md flex flex-col p-4">
                                    {/* Profile Information at the top-left corner */}
                                    <div className="flex items-center space-x-4">
                                        {/* Profile Picture */}
                                        <img
                                            src={`https://randomuser.me/api/portraits/men/${index + 1}.jpg`} // Example random profile image
                                            alt={`Profile ${index + 1}`}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-xl text-gray-800">Name {index + 1}</span>
                                            <span className="text-sm text-gray-600">Role {index + 1}</span>
                                            <span className="text-sm text-gray-600">Location {index + 1}</span>
                                            {/* Skills Section */}
                                            <div className="mt-2">
                                                <div className="flex space-x-2 mt-1">
                                                    {/* Dynamically render skills */}
                                                    {skillsData[index]?.map((skill, skillIndex) => (
                                                        <span
                                                            key={skillIndex}
                                                            className="bg-gray-300 h-12 w-20 text-orange-800 text-xl flex items-center justify-center py-1 px-2 rounded-full"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Description Section */}
                                            <div className="mt-2 text-sm text-gray-600">
                                                {descriptions[index]}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mt-4 text-lg font-medium text-gray-700">
                                    </div>
                                </li>
                            ))
                        ) : (
                            Array.from({ length: jobCount }).map((_, index) => (
                                <li
                                    key={index}
                                    className="w-full h-96 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-lg font-medium text-gray-700"
                                >
                                    Job {index + 1}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
