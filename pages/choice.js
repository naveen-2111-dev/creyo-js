import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter for redirection
import "tailwindcss/tailwind.css";

const BasicWhiteTemplate = () => {
  const [role, setRole] = useState(null); // Freelancer or Client
  const [currentStep, setCurrentStep] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [errors, setErrors] = useState({});
  const [freelancerDetails, setFreelancerDetails] = useState({
    name: "",
    description: "",
    workType: "",
    skills: [],
    experience: "", // This will be a string for freelancer experience
    paymentMethod: "",
    language: "",
  });
  const [clientDetails, setClientDetails] = useState({
    companyName: "",
    projectDescription: "",
    paymentMethod: "",
    language: "",
    requiredSkills: [],
  });
  const router = useRouter();

  // Validation function
  const validateStep = () => {
    const newErrors = {};

    // Freelancer validation for each step
    if (role === "freelancer") {
      switch (currentStep) {
        case 0:
          if (!freelancerDetails.name) newErrors.name = "Name is required";
          break;
        case 1:
          if (!freelancerDetails.description) newErrors.description = "Description is required";
          break;
        case 2:
          if (!freelancerDetails.workType) newErrors.workType = "Work type is required";
          break;
        case 3:
          if (freelancerDetails.skills.length === 0) newErrors.skills = "At least one skill is required";
          break;
        case 4:
          if (!freelancerDetails.experience) newErrors.experience = "Experience is required"; // Experience validation
          break;
        case 5:
          if (!freelancerDetails.paymentMethod) newErrors.paymentMethod = "Payment method is required";
          break;
        case 6:
          if (!freelancerDetails.language) newErrors.language = "Language is required";
          break;
        default:
          break;
      }
    }

    // Client validation for each step
    if (role === "client") {
      switch (currentStep) {
        case 0:
          if (!clientDetails.companyName) newErrors.companyName = "Company name is required";
          break;
        case 1:
          if (!clientDetails.projectDescription) newErrors.projectDescription = "Project description is required";
          break;
        case 2:
          if (!clientDetails.paymentMethod) newErrors.paymentMethod = "Payment method is required";
          break;
        case 3:
          if (!clientDetails.language) newErrors.language = "Language is required";
          break;
        case 4:
          if (clientDetails.requiredSkills.length === 0) newErrors.requiredSkills = "At least one required skill is required";
          break;
        default:
          break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    if (validateStep()) {
      if (role === "freelancer") {
        if (currentStep < 6) { // Adjust based on the number of steps for freelancer
          setCurrentStep(currentStep + 1);
        }
      } else if (role === "client") {
        if (currentStep < 4) { // Adjust based on the number of steps for client
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  const handleFinish = () => {
    setShowCongrats(true);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "freelancer") {
      setFreelancerDetails((prev) => ({ ...prev, [name]: value }));
    } else if (type === "client") {
      setClientDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (e, type) => {
    const { value } = e.target;
    if (type === "freelancer") {
      setFreelancerDetails((prev) => ({ ...prev, skills: value.split(", ") }));
    } else if (type === "client") {
      setClientDetails((prev) => ({ ...prev, requiredSkills: value.split(", ") }));
    }
  };

  const handleCountdown = () => {
    let countdownValue = 3;
    const interval = setInterval(() => {
      setCountdown(countdownValue);
      if (countdownValue === 0) {
        clearInterval(interval);
        router.push("/dashboard");
      }
      countdownValue--;
    }, 1000);
  };

  useEffect(() => {
    if (showCongrats) {
      handleCountdown();
    }
  }, [showCongrats]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {!role ? (
          <div>
            <h2 className="text-2xl font-semibold text-center">Are you a Freelancer or Client?</h2>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setRole("freelancer")}
                className="w-full p-3 bg-blue-500 text-white rounded-md mr-2"
              >
                Freelancer
              </button>
              <button
                onClick={() => setRole("client")}
                className="w-full p-3 bg-green-500 text-white rounded-md ml-2"
              >
                Client
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center">
              {role === "freelancer" ? "Freelancer" : "Client"} Form
            </h2>
            {role === "freelancer" ? (
              // Render freelancer form
              <div>
                {currentStep === 0 && (
                  <div>
                    <label htmlFor="name" className="block mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={freelancerDetails.name}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="Enter your name"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                  </div>
                )}
                {currentStep === 1 && (
                  <div>
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={freelancerDetails.description}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="Enter description"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <label htmlFor="workType" className="block mb-2">What type of work do you prefer?</label>
                    <input
                      type="text"
                      name="workType"
                      value={freelancerDetails.workType}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="Enter preferred work type"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.workType && <p className="text-red-500">{errors.workType}</p>}
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <label htmlFor="skills" className="block mb-2">Skills (comma separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={freelancerDetails.skills.join(", ")}
                      onChange={(e) => handleSkillsChange(e, "freelancer")}
                      placeholder="Enter skills"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.skills && <p className="text-red-500">{errors.skills}</p>}
                  </div>
                )}
                {currentStep === 4 && (
                  <div>
                    <label htmlFor="experience" className="block mb-2">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={freelancerDetails.experience}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="Enter experience"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.experience && <p className="text-red-500">{errors.experience}</p>}
                  </div>
                )}
                {currentStep === 5 && (
                  <div>
                    <label htmlFor="paymentMethod" className="block mb-2">Payment Method</label>
                    <input
                      type="text"
                      name="paymentMethod"
                      value={freelancerDetails.paymentMethod}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="Enter payment method"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
                  </div>
                )}
                {currentStep === 6 && (
                  <div>
                    <label htmlFor="language" className="block mb-2">Preferred Language</label>
                    <input
                      type="text"
                      name="language"
                      value={freelancerDetails.language}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="Enter language"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.language && <p className="text-red-500">{errors.language}</p>}
                  </div>
                )}
              </div>
            ) : (
              // Render client form
              <div>
                {currentStep === 0 && (
                  <div>
                    <label htmlFor="companyName" className="block mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={clientDetails.companyName}
                      onChange={(e) => handleInputChange(e, "client")}
                      placeholder="Enter company name"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
                  </div>
                )}
                {currentStep === 1 && (
                  <div>
                    <label htmlFor="projectDescription" className="block mb-2">Project Description</label>
                    <input
                      type="text"
                      name="projectDescription"
                      value={clientDetails.projectDescription}
                      onChange={(e) => handleInputChange(e, "client")}
                      placeholder="Enter project description"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.projectDescription && <p className="text-red-500">{errors.projectDescription}</p>}
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <label htmlFor="paymentMethod" className="block mb-2">Payment Method</label>
                    <input
                      type="text"
                      name="paymentMethod"
                      value={clientDetails.paymentMethod}
                      onChange={(e) => handleInputChange(e, "client")}
                      placeholder="Enter payment method"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <label htmlFor="language" className="block mb-2">Preferred Language</label>
                    <input
                      type="text"
                      name="language"
                      value={clientDetails.language}
                      onChange={(e) => handleInputChange(e, "client")}
                      placeholder="Enter language"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.language && <p className="text-red-500">{errors.language}</p>}
                  </div>
                )}
                {currentStep === 4 && (
                  <div>
                    <label htmlFor="requiredSkills" className="block mb-2">Required Skills (comma separated)</label>
                    <input
                      type="text"
                      name="requiredSkills"
                      value={clientDetails.requiredSkills.join(", ")}
                      onChange={(e) => handleSkillsChange(e, "client")}
                      placeholder="Enter required skills"
                      className="w-full p-3 bg-gray-100 border rounded-md"
                    />
                    {errors.requiredSkills && <p className="text-red-500">{errors.requiredSkills}</p>}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="w-full p-3 bg-gray-500 text-white rounded-md"
                >
                  Back
                </button>
              )}
              {currentStep === (role === "freelancer" ? 6 : 4) ? (
                <button
                  onClick={handleFinish}
                  className="w-full p-3 bg-blue-500 text-white rounded-md"
                >
                  Finish
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full p-3 bg-blue-500 text-white rounded-md"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {showCongrats && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold">Congratulations!</h2>
            <p className="mt-4">You have successfully completed the form. Redirecting to your dashboard in {countdown} seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicWhiteTemplate;
