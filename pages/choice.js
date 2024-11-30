import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter for redirection
import "tailwindcss/tailwind.css";

const BasicWhiteTemplate = () => {
  const [role, setRole] = useState(null); // Freelancer or Client
  const [currentStep, setCurrentStep] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [errors, setErrors] = useState({
    dateOfBirth: "",

  });
  const [freelancerDetails, setFreelancerDetails] = useState({
    name: "",
    description: "",
    workType: "",
    skills: [],
    experience: [{ companyName: '', startDate: '', endDate: '', description: '' }],
    paymentMethod: "",
    language: "",
    address: [{ pincode: '', state: '', city: '', houseNo: '', streetName: '' }],
    dateOfBirth: "",

  });

  const [clientDetails, setClientDetails] = useState({
    companyName: "",
    projectDescription: "",
    paymentMethod: "",
    language: "",
    requiredSkills: [],
  });
  const availableSkills = [
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
  const availableLanguages = [
    'English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic', 'Russian', 'Japanese',
  ];
  const [experienceAdded, setExperienceAdded] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const router = useRouter();

  // Validation function
  const validateStep = () => {
    const newErrors = {...errors };


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
        case 7:
          if (!freelancerDetails.address) newErrors.address = "Address is required";
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

  const handleDOBChange = (e) => {
    setFreelancerDetails({
      ...freelancerDetails,
      dateOfBirth: e.target.value,
    });
  };

  const handleNext = () => {
    if (validateStep()) {
      if (role === "freelancer") {
        if (currentStep < 10) { // Adjust based on the number of steps for freelancer
          setCurrentStep(currentStep + 1);

        }
      } else if (role === "client") {
        if (currentStep < 4) { // Adjust based on the number of steps for client
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  const deleteAddress = (index) => {
    const updatedAddresses = [...freelancerDetails.address];
    updatedAddresses.splice(index, 1); // Remove the address at the specified index
    setFreelancerDetails({
      ...freelancerDetails,
      address: updatedAddresses,
    });
  };

  const handleFinish = () => {
    handleSubmit();
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

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setFreelancerDetails((prevState) => {
      const updatedSkills = prevState.skills.includes(value)
        ? prevState.skills.filter((skill) => skill !== value)
        : [...prevState.skills, value];
      return { ...prevState, skills: updatedSkills };
    });
  };
  // const handleSkillsChange = (e, type) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);

  //   // Update the freelancerDetails state with the selected skills
  //   setFreelancerDetails({
  //     ...freelancerDetails,
  //     skills: selectedOptions,
  //   });
  // };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...freelancerDetails.experience];
    updatedExperience[index][field] = value;
    setFreelancerDetails({ ...freelancerDetails, experience: updatedExperience });
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;

    const updatedAddress = [...freelancerDetails.address];
    const fieldName = name.split('.')[1]; // Extract field name (e.g., pincode, state, etc.)

    updatedAddress[index] = {
      ...updatedAddress[index],
      [fieldName]: value,
    };

    setFreelancerDetails({
      ...freelancerDetails,
      address: updatedAddress,
    });
  };

  const addAddress = () => {
    setFreelancerDetails({
      ...freelancerDetails,
      address: [
        ...freelancerDetails.address,
        { pincode: '', state: '', city: '', houseNo: '', streetName: '' },
      ],
    });
  };

  const addExperienceRow = () => {
    setFreelancerDetails({
      ...freelancerDetails,
      experience: [
        ...freelancerDetails.experience,
        { companyName: "", startDate: "", endDate: "", description: "" },
      ],
    });
    setExperienceAdded(true); // Mark that "Add Another Experience" has been clicked
  };


  const deleteExperienceRow = (index) => {
    const updatedExperience = freelancerDetails.experience.filter((_, i) => i !== index);
    setFreelancerDetails({ ...freelancerDetails, experience: updatedExperience });
  };

  const handlePaymentMethodChange = (e, type) => {
    const { checked } = e.target;
    const newPaymentMethod = checked
      ? [...freelancerDetails.paymentMethod, type] // Add the selected option
      : freelancerDetails.paymentMethod.filter(item => item !== type); // Remove the unselected option

    setFreelancerDetails({
      ...freelancerDetails,
      paymentMethod: newPaymentMethod,
    });
  };
  const handleLanguageClick = (language) => {
    if (!selectedLanguages.includes(language)) {
      // console.log("Current Step: ", currentStep);
      setSelectedLanguages([language, ...selectedLanguages]); // Add the language at the top
    }
  };
  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter(item => item !== language));
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
  const handleSubmit = () => {
    console.log(freelancerDetails); // Log the form data when submit is clicked
  };
  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch('@/api/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(freelancerDetails),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to save freelancer details');
  //     }
  
  //     const data = await response.json();
  //     console.log('Freelancer profile saved:', data);
  //     alert('Freelancer profile saved successfully!');
  //   } catch (error) {
  //     console.error('Error submitting freelancer details:', error);
  //     alert('Error saving freelancer profile.');
  //   }
  // };
  

  useEffect(() => {
    if (showCongrats) {
      handleCountdown();
    }
  }, [showCongrats]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-3xl w-full">
        {!role ? (
          <div>
            <h2 className="text-2xl font-semibold text-center">Are you a Freelancer or Client?</h2>
            <div className="flex justify-between mt-12">
              <button
                onClick={() => setRole("freelancer")}
                className="w-full h-52 p-3 bg-white text-black border border-black hover:bg-black hover:text-white transition-all rounded-md mr-2"
              >
                Freelancer
              </button>
              <button
                onClick={() => setRole("client")}
                className="w-full p-3 bg-white text-black border border-black hover:bg-black hover:text-white rounded-md ml-2"
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
                    <label htmlFor="name" className="block mb-2">How do we want to call you?</label>
                    <input
                      type="text"
                      name="name"
                      value={freelancerDetails.name}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="Enter your name"
                      className="w-full p-3 bg-white border rounded-md"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                  </div>
                )}
                {currentStep === 1 && (
                  <div>
                    <label htmlFor="description" className="block mb-2">
                      How do you want to describe yourself?
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={freelancerDetails.description}
                      onChange={(e) => handleInputChange(e, "freelancer")}
                      placeholder="How do you want to describe yourself?"
                      className="w-full h-56 p-3 bg-white border rounded-md"
                    />
                    {errors.description && (
                      <p className="text-red-500">{errors.description}</p>
                    )}
                    <p className="mt-2 text-gray-600 text-sm">
                      {freelancerDetails.description.length} / 500 characters
                    </p>
                  </div>


                )}
                {currentStep === 2 && (
                  <div>
                    <label htmlFor="workType" className="block mb-2">
                      What type of work do you prefer?
                    </label>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="workType"
                          value="Beginner"
                          checked={freelancerDetails.workType === "Beginner"}
                          onChange={(e) => handleInputChange(e, "freelancer")}
                          className="mr-2"
                        />
                        Beginner
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="workType"
                          value="Intermediate"
                          checked={freelancerDetails.workType === "Intermediate"}
                          onChange={(e) => handleInputChange(e, "freelancer")}
                          className="mr-2"
                        />
                        Intermediate
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="workType"
                          value="Pro"
                          checked={freelancerDetails.workType === "Pro"}
                          onChange={(e) => handleInputChange(e, "freelancer")}
                          className="mr-2"
                        />
                        Pro
                      </label>
                    </div>
                    {errors.workType && (
                      <p className="text-red-500 mt-2">{errors.workType}</p>
                    )}
                  </div>

                )}
                {currentStep === 3 && (
                  <div>
                    <label htmlFor="skills" className="block mb-2">
                      Skills (Select from list)
                    </label>
                    <div className="space-y-2">
                      {availableSkills.map((skill) => (
                        <div key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            id={skill}
                            value={skill}
                            checked={freelancerDetails.skills.includes(skill)}
                            onChange={handleSkillsChange}
                            className="mr-2"
                          />
                          <label htmlFor={skill} className="text-black">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                    {freelancerDetails.skills.length === 0 && (
                      <p className="text-red-500">Please select at least one skill</p>
                    )}
                  </div>
                )}
                {currentStep === 4 && (
                  <div>
                    <label htmlFor="experience" className="block mb-2">
                      Experience
                    </label>

                    {freelancerDetails.experience.map((exp, index) => (
                      <div key={index} className="mb-6 space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          {/* Company Name */}
                          <div>
                            <label htmlFor={`companyName-${index}`} className="block mb-1">Company Name</label>
                            <input
                              type="text"
                              id={`companyName-${index}`}
                              value={exp.companyName}
                              onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                              placeholder="Enter company name"
                              className="w-full p-3 bg-white border rounded-md"
                            />
                          </div>

                          {/* Start Date */}
                          <div>
                            <label htmlFor={`startDate-${index}`} className="block mb-1">Start Date</label>
                            <input
                              type="date"
                              id={`startDate-${index}`}
                              value={exp.startDate}
                              onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                              className="w-full p-3 bg-white border rounded-md"
                            />
                          </div>

                          {/* End Date */}
                          <div>
                            <label htmlFor={`endDate-${index}`} className="block mb-1">End Date</label>
                            <input
                              type="date"
                              id={`endDate-${index}`}
                              value={exp.endDate}
                              onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                              className="w-full p-3 bg-white border rounded-md"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label htmlFor={`description-${index}`} className="block mb-1">
                            Description of Role
                          </label>
                          <textarea
                            id={`description-${index}`}
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                            placeholder="Enter description of your role"
                            className="w-full p-3 bg-white border rounded-md"
                          />
                        </div>

                        {/* Delete Button (Visible only after adding another experience) */}
                        {experienceAdded && freelancerDetails.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteExperienceRow(index)}
                            className="mt-2 p-2 text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-md"
                          >
                            Delete This Experience
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addExperienceRow}
                      className="mt-4 p-2 bg-white text-black border border-black hover:bg-black hover:text-white transition-all rounded-md"
                    >
                      Add Another Experience
                    </button>
                  </div>
                )}
                {currentStep === 5 && (
                  <div>
                    <label htmlFor="paymentMethod" className="block mb-2">Payment Method</label>
                    <div className="space-y-3">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="paymentMethod"
                          value="hourly"
                          checked={freelancerDetails.paymentMethod.includes('hourly')}
                          onChange={(e) => handlePaymentMethodChange(e, "hourly")}
                          className="form-checkbox"
                        />
                        <span className="m-5">Hourly</span>
                      </label>

                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="paymentMethod"
                          value="weekly"
                          checked={freelancerDetails.paymentMethod.includes('weekly')}
                          onChange={(e) => handlePaymentMethodChange(e, "weekly")}
                          className="form-checkbox"
                        />
                        <span className="m-5">Weekly</span>
                      </label>

                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="paymentMethod"
                          value="serviceEnd"
                          checked={freelancerDetails.paymentMethod.includes('serviceEnd')}
                          onChange={(e) => handlePaymentMethodChange(e, "serviceEnd")}
                          className="form-checkbox"
                        />
                        <span className="m-5">Service End</span>
                      </label>
                    </div>

                    {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
                  </div>

                )}
                {currentStep === 6 && (
                  <div>
                    <label htmlFor="language" className="block mb-2">Language you knows</label>

                    {/* Available Languages List */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {availableLanguages.map((language) => (
                        <button
                          key={language}
                          onClick={() => handleLanguageClick(language)}
                          className="p-2 bg-white border border-black text-black rounded-full hover:bg-black hover:text-white "
                        >
                          {language}
                        </button>
                      ))}
                    </div>

                    {/* Selected Languages List */}
                    <div>
                      <label className="block mb-2">Selected Languages:</label>
                      <div className="space-y-2">
                        {selectedLanguages.map((language, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
                            <span>{language}</span>
                            <button
                              onClick={() => handleRemoveLanguage(language)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 7 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Address Details</h3>

                    {/* Loop through address array */}
                    {freelancerDetails.address.map((address, index) => (
                      <div key={index} className="mb-6">

                        {/* Pincode */}
                        <div className="mb-4">
                          <label htmlFor={`pincode-${index}`} className="block mb-2">Pincode</label>
                          <input
                            type="text"
                            name={`address[${index}].pincode`}
                            value={address.pincode}
                            onChange={(e) => handleAddressChange(e, index)}
                            placeholder="Enter your pincode"
                            className="w-full p-3 bg-white border rounded-md"
                          />
                        </div>

                        {/* State and City */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor={`state-${index}`} className="block mb-2">State</label>
                            <input
                              type="text"
                              name={`address[${index}].state`}
                              value={address.state}
                              onChange={(e) => handleAddressChange(e, index)}
                              placeholder="Enter your state"
                              className="w-full p-3 bg-white border rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor={`city-${index}`} className="block mb-2">City</label>
                            <input
                              type="text"
                              name={`address[${index}].city`}
                              value={address.city}
                              onChange={(e) => handleAddressChange(e, index)}
                              placeholder="Enter your city"
                              className="w-full p-3 bg-white border rounded-md"
                            />
                          </div>
                        </div>

                        {/* House Number */}
                        <div className="mb-4">
                          <label htmlFor={`houseNo-${index}`} className="block mb-2">House Number</label>
                          <input
                            type="text"
                            name={`address[${index}].houseNo`}
                            value={address.houseNo}
                            onChange={(e) => handleAddressChange(e, index)}
                            placeholder="Enter your house number"
                            className="w-full p-3 bg-white border rounded-md"
                          />
                        </div>

                        {/* Street Name */}
                        <div className="mb-4">
                          <label htmlFor={`streetName-${index}`} className="block mb-2">Street Name</label>
                          <input
                            type="text"
                            name={`address[${index}].streetName`}
                            value={address.streetName}
                            onChange={(e) => handleAddressChange(e, index)}
                            placeholder="Enter your street name"
                            className="w-full p-3 bg-white border rounded-md"
                          />
                        </div>

                        {/* Delete Address Button (Visible only after adding another address) */}
                        {freelancerDetails.address.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteAddress(index)}
                            className="mt-2 p-2 text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-md"
                          >
                            Delete This Address
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Button to Add More Address */}
                    <button
                      onClick={addAddress}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Add Another Address
                    </button>
                  </div>
                )}
                {currentStep === 8 && (
                  <div>
                    <label htmlFor="dateOfBirth" className="block mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={freelancerDetails.dateOfBirth}
                      onChange={handleDOBChange}
                      className="w-full p-3 bg-white border rounded-md"
                    />
                    {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
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
                      className="w-full p-3 bg-white border rounded-md"
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
                      className="w-full p-3 bg-white border rounded-md"
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
                      className="w-full p-3 bg-white border rounded-md"
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
                      className="w-full p-3 bg-white border rounded-md"
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
                      className="w-full p-3 bg-white border rounded-md"
                    />
                    {errors.requiredSkills && <p className="text-red-500">{errors.requiredSkills}</p>}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center gap-10 mt-6">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="w-1/8 p-2  border border-black text-black bg-white rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>

                </button>
              )}
              {currentStep === (role === "freelancer" ? 8 : 4) ? (
                <button
                  onClick={handleFinish}
                  className="w-full p-3 bg-black text-white rounded-md"
                >
                  Finish
                </button>
              ) : (
                <button
                  // onClick={handleNext}
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="w-1/8  p-3 bg-black text-white rounded-md "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>

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
