import LancerProfile from "@/db/freelancerProfile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "tailwindcss/tailwind.css";




const FreelancerDashboard = () => {
  const router = useRouter();
  const [freelancerDetails, setFreelancerDetails] = useState({
    name: "",
    pronoun: "",
    Experience: "",
    goal: "",
    manual: {
      fieldOfWork: "",
      skills: [],
      role: "",
      experience: [
        {
          placeofWork: "",
          company: "",
          Location: "",
          start: "",
          present: "",
          description: "",
        },
      ],
      education: {
        sslc: "",
        hsc: "",
        university: "",
      },
      language: [],
      bio: {
        link: "",
        content: "",
      },
      payment: "",
      location: "",
      dob: "",
      address: {
        dno: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
  });
  const [otherSelected, setOtherSelected] = useState(false);
  const [count, setCount] = useState(1);
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "Python",
    "Ruby",
    "Go",
    "Java",
    "TypeScript",
  ];

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      const res = await LancerProfile(freelancerDetails);

      if (res) {
        router.push("/dashboard");
      } else {
        router.push("/freelancerDashboard");
      }
    } catch (error) {
      console.error("Error during profile submission:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/images/p2.jpg')] bg-cover bg-center text-gray-900 ">
      <div className="absolute top-4 left-4  text-white text-3xl px-4 py-2 rounded-md">
        {count} / 10
      </div>

      <div className="w-full h-5xl max-w-6xl p-6 bg-white rounded-lg shadow-2xl py-20">

        {count === 1 && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Input Form */}
            <div className="w-full md:w-1/2 py-10">
              <h2 className="text-2xl font-bold text-center mb-4">How can we call you?</h2>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setFreelancerDetails({
                      ...freelancerDetails,
                      name: e.target.value,
                    })
                  }
                  className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md outline-none focus:ring-0 focus:border-orange-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pronoun" className="block text-sm font-medium">
                  Pronoun
                </label>
                <select
                  id="pronoun"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "other") {
                      setFreelancerDetails({ ...freelancerDetails, pronoun: "" });
                      setOtherSelected(true); // Show input box
                    } else {
                      setFreelancerDetails({ ...freelancerDetails, pronoun: value });
                      setOtherSelected(false); // Hide input box
                    }
                  }}
                  className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select your pronoun</option>
                  <option value="He/Him">He/Him</option>
                  <option value="She/Her">She/Her</option>
                  <option value="They/Them">They/Them</option>
                  <option value="Ze/Zir">Ze/Zir</option>
                  <option value="Xe/Xem">Xe/Xem</option>
                  <option value="other">Other</option>
                </select>

                {/* Show text input only if "Other" is selected */}
                {otherSelected && (
                  <input
                    type="text"
                    id="customPronoun"
                    placeholder="Enter your pronoun"
                    onChange={(e) =>
                      setFreelancerDetails({ ...freelancerDetails, pronoun: e.target.value })
                    }
                    className="w-full mt-2 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                )}
              </div>


            </div>

            {/* Right Side: Dynamic Display */}
            <div className="w-full md:w-1/2 bg-orange-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold mb-4">Profile Picture</h2>

              {/* Profile Picture Upload Section */}
              <div className="mb-4 flex flex-col items-center relative">
                {/* Plus Symbol on top of the Profile Circle */}
                <div
                  className="absolute top-0 right-0 flex items-center justify-center bg-white rounded-full w-10 h-10 text-gray-700 cursor-pointer shadow-lg transform translate-x-1/5 -translate-y-1/5 font-bold text-sm"
                  onClick={() => document.getElementById('fileInput').click()} // Trigger the hidden file input
                >
                  Add
                </div>

                {/* Profile Image */}
                <img
                  src={freelancerDetails.profilePicture || "/default-profile.png"} // Default profile picture
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover  border-4 border-white"
                />

                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFreelancerDetails({
                          ...freelancerDetails,
                          profilePicture: reader.result, // Set the uploaded image as the profile picture
                        });
                      };
                      reader.readAsDataURL(file); // Convert the image to a data URL
                    }
                  }}
                  className="mt-2 cursor-pointer text-sm text-gray-700 hidden"
                />
              </div>

              {/* Display Name and Pronouns */}
              <p className="text-5xl text-center mt-2">
                <span className="font-semibold"></span> {freelancerDetails.name || "Your Name"}
              </p>
              <p className="text-3xl text-center mt-1">
                <span className="font-semibold"></span> {freelancerDetails.pronoun || "Your Pronoun"}
              </p>
            </div>


          </div>
        )}



        {count === 2 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Select Your Experience Level
            </h2>
            <div className="flex flex-row gap-4 justify-center">
              {/* New button with image and subtext */}
              <button
                type="button"
                className={`w-80 py-4 px-6 rounded-lg border ${freelancerDetails.Experience === "New"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
                  } hover:bg-orange-400 hover:text-white shadow-lg transition duration-300 transform hover:scale-105`}
                onClick={() =>
                  setFreelancerDetails({
                    ...freelancerDetails,
                    Experience: "New",
                  })
                }
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/images/beginner.jpg" // Add your image path here
                    alt="New"
                    className="w-72 h-72 mb-2"
                  />
                  <span className="text-xl font-semibold">Beginner</span>
                  <p className="text-md text-center text-gray-600 mt-2">
                    Just getting started and learning the basics.
                  </p>
                </div>
              </button>

              {/* Intermediate button with image and subtext */}
              <button
                type="button"
                className={`w-80 py-4 px-6 rounded-lg border ${freelancerDetails.Experience === "Intermediate"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
                  } hover:bg-orange-400 hover:text-white shadow-lg transition duration-300 transform hover:scale-105`}
                onClick={() =>
                  setFreelancerDetails({
                    ...freelancerDetails,
                    Experience: "Intermediate",
                  })
                }
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/images/intermediate.jpg" // Add your image path here
                    alt="Intermediate"
                    className="w-72 h-72 mb-2"
                  />
                  <span className="text-xl font-semibold">Intermediate</span>
                  <p className="text-md text-center text-gray-600 mt-2">
                    Building on your skills with more advanced techniques.
                  </p>
                </div>
              </button>

              {/* Expert button with image and subtext */}
              <button
                type="button"
                className={`w-80 py-4 px-6 rounded-lg border ${freelancerDetails.Experience === "Expert"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
                  } hover:bg-orange-400 hover:text-white shadow-lg transition duration-300 transform hover:scale-105`}
                onClick={() =>
                  setFreelancerDetails({
                    ...freelancerDetails,
                    Experience: "Expert",
                  })
                }
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/images/pro.jpg" // Add your image path here
                    alt="Expert"
                    className="w-72 h-72 mb-2"
                  />
                  <span className="text-xl font-semibold">Expert</span>
                  <p className="text-md text-center text-gray-600 mt-2">
                    Mastering the craft and achieving expert-level proficiency.
                  </p>
                </div>
              </button>
            </div>
          </>
        )}


        {count === 3 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Select Your Goal
            </h2>
            <div className="flex flex-row gap-4 justify-center">
              {/* Earn Money button with image and subtext */}
              <button
                type="button"
                className={`w-80 py-4 px-6 rounded-lg border ${freelancerDetails.goal === "Earn Money"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
                  } hover:bg-orange-400 hover:text-white shadow-lg transition duration-300 transform hover:scale-105`}
                onClick={() =>
                  setFreelancerDetails({
                    ...freelancerDetails,
                    goal: "Earn Money",
                  })
                }
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/images/coins.jpg" // Add your image path here
                    alt="Earn Money"
                    className="w-72 h-72 mb-2"
                  />
                  <span className="text-xl font-semibold">Earn Money</span>
                  <p className="text-md text-center text-gray-600 mt-2">
                    Achieve financial independence and start earning.
                  </p>
                </div>
              </button>

              {/* Learn Skills button with image and subtext */}
              <button
                type="button"
                className={`w-80 py-4 px-6 rounded-lg border ${freelancerDetails.goal === "Learn Skills"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
                  } hover:bg-orange-400 hover:text-white shadow-lg transition duration-300 transform hover:scale-105`}
                onClick={() =>
                  setFreelancerDetails({
                    ...freelancerDetails,
                    goal: "Learn Skills",
                  })
                }
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/images/sidehustle.jpg" // Add your image path here
                    alt="Learn Skills"
                    className="w-72 h-72 mb-2"
                  />
                  <span className="text-xl font-semibold">Learn Skills</span>
                  <p className="text-md text-center text-gray-600 mt-2">
                    Improve your expertise and knowledge in your field.
                  </p>
                </div>
              </button>

              {/* Hobby button with image and subtext */}
              <button
                type="button"
                className={`w-80 py-4 px-6 rounded-lg border ${freelancerDetails.goal === "Hobby"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
                  } hover:bg-orange-400 hover:text-white shadow-lg transition duration-300 transform hover:scale-105`}
                onClick={() =>
                  setFreelancerDetails({
                    ...freelancerDetails,
                    goal: "Hobby",
                  })
                }
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/images/learn.jpg" // Add your image path here
                    alt="Hobby"
                    className="w-72 h-72 mb-2"
                  />
                  <span className="text-xl font-semibold">Hobby</span>
                  <p className="text-md text-center text-gray-600 mt-2">
                    Engage in something you love doing for fun and relaxation.
                  </p>
                </div>
              </button>
            </div>
          </>
        )}


        {count === 4 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-6">
              Your Work Details
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column */}
              <div className="flex-1">
                <div className="mb-6">
                  <label htmlFor="fieldOfWork" className="block text-lg font-bold mb-2">
                    Field of Work
                  </label>
                  <input
                    type="text"
                    id="fieldOfWork"
                    placeholder="Enter your field of work"
                    onChange={(e) =>
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          fieldOfWork: e.target.value,
                        },
                      })
                    }
                    className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="role" className="block text-lg font-bold mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    placeholder="Enter your role"
                    onChange={(e) =>
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          role: e.target.value,
                        },
                      })
                    }
                    className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1">
                <div className="mb-6">
                  <label htmlFor="skills" className="block text-sm font-medium mb-2">
                    Select Skills
                  </label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={skill}
                          value={skill}
                          checked={freelancerDetails.manual.skills.includes(skill)}
                          onChange={(e) => {
                            const skillName = e.target.value;
                            const isChecked = e.target.checked;
                            setFreelancerDetails({
                              ...freelancerDetails,
                              manual: {
                                ...freelancerDetails.manual,
                                skills: isChecked
                                  ? [...freelancerDetails.manual.skills, skillName]
                                  : freelancerDetails.manual.skills.filter(
                                    (item) => item !== skillName
                                  ),
                              },
                            });
                          }}
                          className="p-2 border border-gray-300 rounded-md"
                        />
                        <label htmlFor={skill} className="text-sm">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Selected Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {freelancerDetails.manual.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-orange-500 text-white py-1 px-3 rounded-md"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {count === 5 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-6">
              Your Work Experience
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column - Input Form */}
              <div className="flex-1">
                <div className="mb-4">
                  <label htmlFor="placeOfWork" className="block text-sm font-medium">
                    Place of Work
                  </label>
                  <input
                    type="text"
                    id="placeOfWork"
                    placeholder="Enter the place of work"
                    value={
                      freelancerDetails.manual.experience[
                        freelancerDetails.manual.experience.length - 1
                      ].placeofWork || ""
                    }
                    onChange={(e) => {
                      const updatedExperience = [...freelancerDetails.manual.experience];
                      updatedExperience[updatedExperience.length - 1].placeofWork =
                        e.target.value;
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          experience: updatedExperience,
                        },
                      });
                    }}
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Enter the company name"
                    value={
                      freelancerDetails.manual.experience[
                        freelancerDetails.manual.experience.length - 1
                      ].company || ""
                    }
                    onChange={(e) => {
                      const updatedExperience = [...freelancerDetails.manual.experience];
                      updatedExperience[updatedExperience.length - 1].company =
                        e.target.value;
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          experience: updatedExperience,
                        },
                      });
                    }}
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter the location"
                    value={
                      freelancerDetails.manual.experience[
                        freelancerDetails.manual.experience.length - 1
                      ].Location || ""
                    }
                    onChange={(e) => {
                      const updatedExperience = [...freelancerDetails.manual.experience];
                      updatedExperience[updatedExperience.length - 1].Location =
                        e.target.value;
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          experience: updatedExperience,
                        },
                      });
                    }}
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={
                      freelancerDetails.manual.experience[
                        freelancerDetails.manual.experience.length - 1
                      ].start || ""
                    }
                    onChange={(e) => {
                      const updatedExperience = [...freelancerDetails.manual.experience];
                      updatedExperience[updatedExperience.length - 1].start =
                        e.target.value;
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          experience: updatedExperience,
                        },
                      });
                    }}
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="presentlyWorkHere"
                    checked={
                      freelancerDetails.manual.experience[
                        freelancerDetails.manual.experience.length - 1
                      ].present
                    }
                    onChange={(e) => {
                      const updatedExperience = [...freelancerDetails.manual.experience];
                      updatedExperience[updatedExperience.length - 1].present = e
                        .target.checked
                        ? "Present"
                        : "";
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          experience: updatedExperience,
                        },
                      });
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="presentlyWorkHere" className="text-sm">
                    I presently work here
                  </label>
                </div>

                {!freelancerDetails.manual.experience[
                  freelancerDetails.manual.experience.length - 1
                ].present && (
                    <div className="mb-4">
                      <label htmlFor="endDate" className="block text-sm font-medium">
                        End Date (if applicable)
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={
                          freelancerDetails.manual.experience[
                            freelancerDetails.manual.experience.length - 1
                          ].end || ""
                        }
                        onChange={(e) => {
                          const updatedExperience = [...freelancerDetails.manual.experience];
                          updatedExperience[updatedExperience.length - 1].end =
                            e.target.value;
                          setFreelancerDetails({
                            ...freelancerDetails,
                            manual: {
                              ...freelancerDetails.manual,
                              experience: updatedExperience,
                            },
                          });
                        }}
                        className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  )}

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe your job responsibilities"
                    value={
                      freelancerDetails.manual.experience[
                        freelancerDetails.manual.experience.length - 1
                      ].description || ""
                    }
                    onChange={(e) => {
                      const updatedExperience = [...freelancerDetails.manual.experience];
                      updatedExperience[updatedExperience.length - 1].description =
                        e.target.value;
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          experience: updatedExperience,
                        },
                      });
                    }}
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFreelancerDetails({
                        ...freelancerDetails,
                        manual: {
                          ...freelancerDetails.manual,
                          experience: [
                            ...freelancerDetails.manual.experience.slice(0, -1),
                            {
                              placeofWork: "",
                              company: "",
                              Location: "",
                              start: "",
                              end: "",
                              present: "",
                              description: "",
                            },
                          ],
                        },
                      });
                    }}
                    className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const currentExperience =
                        freelancerDetails.manual.experience[
                        freelancerDetails.manual.experience.length - 1
                        ];
                      if (
                        currentExperience.placeofWork ||
                        currentExperience.company ||
                        currentExperience.Location ||
                        currentExperience.start ||
                        currentExperience.description
                      ) {
                        setFreelancerDetails({
                          ...freelancerDetails,
                          manual: {
                            ...freelancerDetails.manual,
                            experience: [
                              ...freelancerDetails.manual.experience,
                              {
                                placeofWork: "",
                                company: "",
                                Location: "",
                                start: "",
                                end: "",
                                present: "",
                                description: "",
                              },
                            ],
                          },
                        });
                      } else {
                        console.log(
                          "Please fill in the current experience details before adding a new one."
                        );
                      }
                    }}
                    className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                  >
                    Add Experience
                  </button>
                </div>
              </div>

              {/* Right Column - Saved Jobs */}
              <div className="flex-1 bg-gray-50 p-4 rounded-md shadow">
                <h3 className="text-xl font-semibold mb-4">Saved Jobs</h3>
                {freelancerDetails.manual.experience.length > 1 ? (
                  <ul className="space-y-4">
                    {freelancerDetails.manual.experience.slice(0, -1).map((job, index) => (
                      <li
                        key={index}
                        className="bg-white p-4 rounded-md shadow-sm border flex justify-between items-start"
                      >
                        {/* Job Details */}
                        <div>
                          <h4 className="font-medium text-lg">
                            {job.company || "Unknown Company"}
                          </h4>
                          <p className="text-sm text-gray-700">
                            {job.placeofWork}, {job.Location}
                          </p>
                          <p className="text-xs text-gray-500">
                            {job.start} - {job.present || job.end || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                        </div>
                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            const updatedExperience = freelancerDetails.manual.experience.filter(
                              (_, i) => i !== index
                            );
                            setFreelancerDetails({
                              ...freelancerDetails,
                              manual: {
                                ...freelancerDetails.manual,
                                experience: updatedExperience,
                              },
                            });
                          }}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No saved jobs yet.</p>
                )}
              </div>

            </div>
          </>
        )}


        {count === 6 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Your Education Details
            </h2>

            <div className="mb-4">
              <label htmlFor="sslc" className="block text-sm font-medium">
                SSLC / 10th Marks (in percentage)
              </label>
              <input
                type="number"
                id="sslc"
                placeholder="Enter your SSLC / 10th marks"
                value={freelancerDetails.manual.education.sslc || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      education: {
                        ...freelancerDetails.manual.education,
                        sslc: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="hsc" className="block text-sm font-medium">
                HSC / 12th Marks (in percentage)
              </label>
              <input
                type="number"
                id="hsc"
                placeholder="Enter your HSC / 12th marks"
                value={freelancerDetails.manual.education.hsc || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      education: {
                        ...freelancerDetails.manual.education,
                        hsc: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="university" className="block text-sm font-medium">
                University / Graduation Marks (in percentage)
              </label>
              <input
                type="number"
                id="university"
                placeholder="Enter your University / Graduation marks"
                value={freelancerDetails.manual.education.university || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      education: {
                        ...freelancerDetails.manual.education,
                        university: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </>
        )}

        {count === 7 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Languages
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Choose a language
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  "English",
                  "Spanish",
                  "French",
                  "German",
                  "Mandarin",
                  "Hindi",
                  "Arabic",
                ].map((lang, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      if (!freelancerDetails.manual.language.includes(lang)) {
                        setFreelancerDetails({
                          ...freelancerDetails,
                          manual: {
                            ...freelancerDetails.manual,
                            language: [
                              ...freelancerDetails.manual.language,
                              lang,
                            ],
                          },
                        });
                      }
                    }}
                    className="py-2 px-4 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Selected Languages</h3>
              {freelancerDetails.manual.language.length > 0 ? (
                <ul className="space-y-2">
                  {freelancerDetails.manual.language.map((lang, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded-md">
                      <span>{lang}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedLanguages =
                            freelancerDetails.manual.language.filter(
                              (language) => language !== lang
                            );
                          setFreelancerDetails({
                            ...freelancerDetails,
                            manual: {
                              ...freelancerDetails.manual,
                              language: updatedLanguages,
                            },
                          });
                        }}
                        className="ml-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No languages selected yet.</p>
              )}
            </div>
          </>
        )}

        {count === 8 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">Bio</h2>

            <div className="mb-4">
              <label htmlFor="link" className="block text-sm font-medium">
                Link
              </label>
              <input
                type="url"
                id="link"
                placeholder="Enter your bio link (e.g., personal website or portfolio)"
                value={freelancerDetails.manual.bio.link || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      bio: {
                        ...freelancerDetails.manual.bio,
                        link: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Bio Description Input */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write a brief description about yourself"
                value={freelancerDetails.manual.bio.content || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      bio: {
                        ...freelancerDetails.manual.bio,
                        content: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </>
        )}

        {count === 9 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Payment & Location
            </h2>

            <div className="mb-4">
              <label htmlFor="payment" className="block text-sm font-medium">
                Amount You Want
              </label>
              <input
                type="number"
                id="payment"
                placeholder="Enter the amount you want to charge"
                value={freelancerDetails.manual.payment || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      payment: e.target.value,
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fee" className="block text-sm font-medium">
                Fee
              </label>
              <input
                type="text"
                id="fee"
                value="10%"
                readOnly
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="total" className="block text-sm font-medium">
                Total After Fee
              </label>
              <input
                type="text"
                id="total"
                value={
                  freelancerDetails.manual.payment
                    ? (freelancerDetails.manual.payment * 0.9).toFixed(2)
                    : ""
                }
                readOnly
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Enter your location"
                value={freelancerDetails.manual.location || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      location: e.target.value,
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={freelancerDetails.manual.dob || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      dob: e.target.value,
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </>
        )}

        {count === 10 && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">Address</h2>

            <div className="mb-4">
              <label htmlFor="dno" className="block text-sm font-medium">
                Door Number
              </label>
              <input
                type="text"
                id="dno"
                placeholder="Enter the door number"
                value={freelancerDetails.manual.address.dno || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      address: {
                        ...freelancerDetails.manual.address,
                        dno: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="street" className="block text-sm font-medium">
                Street
              </label>
              <input
                type="text"
                id="street"
                placeholder="Enter your street name"
                value={freelancerDetails.manual.address.street || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      address: {
                        ...freelancerDetails.manual.address,
                        street: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                value={freelancerDetails.manual.address.city || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      address: {
                        ...freelancerDetails.manual.address,
                        city: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium">
                State
              </label>
              <input
                type="text"
                id="state"
                placeholder="Enter your state"
                value={freelancerDetails.manual.address.state || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      address: {
                        ...freelancerDetails.manual.address,
                        state: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pincode" className="block text-sm font-medium">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                placeholder="Enter your pincode"
                value={freelancerDetails.manual.address.pincode || ""}
                onChange={(e) => {
                  setFreelancerDetails({
                    ...freelancerDetails,
                    manual: {
                      ...freelancerDetails.manual,
                      address: {
                        ...freelancerDetails.manual.address,
                        pincode: e.target.value,
                      },
                    },
                  });
                }}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </>
        )}

        <div className="flex justify-center gap-3 mt-4">
          {count > 1 && (
            <button
              type="button"
              onClick={handleDecrement}
              className="w-full  h-20 py-3 mt-10 px-2  border border-orange text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Prev
            </button>
          )}
          {count === 10 ? (
            <button
              type="button"
              onClick={handleComplete}
              className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              complete
            </button>
          ) : (
            <button
              type="button"
              onClick={handleIncrement}
              className="w-full py-4 px-1 mt-10 border border-orange-500  text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
