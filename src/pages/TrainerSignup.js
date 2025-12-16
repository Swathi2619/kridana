// src/pages/TrainerSignup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit2 } from "lucide-react"; // npm install lucide-react [web:28][web:37]

export default function TrainerSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const role = "trainer";

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const [formData, setFormData] = useState({
    // Step 1
    trainerName: "",
    yearsExperience: "",
    phoneNumber: "",
    email: "",
    instituteName: "",
    certification: "",
    // Step 2
    address: "",
    zipCode: "",
    city: "",
    state: "",
    websiteLink: "",
    // Step 3
    firstName: "",
    lastName: "",
    designation: "",
    measurements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setProfileImageFile(file);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.trainerName ||
        !formData.yearsExperience ||
        !formData.phoneNumber ||
        !formData.email ||
        !formData.instituteName ||
        !formData.certification
      ) {
        alert("Please fill all fields in Step 1");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert("Please enter a valid email");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (
        !formData.address ||
        !formData.zipCode ||
        !formData.city ||
        !formData.state
        // websiteLink optional
      ) {
        alert("Please fill all required address fields");
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.designation ||
        !formData.measurements
      ) {
        alert("Please fill all management fields");
        return false;
      }
      return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    console.log("Trainer signup data:", { role, ...formData, profileImageFile });
    alert("Trainer details saved!");
    navigate("/");
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Step 0{step}</h2>
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              {/* Profile & header */}
              <div className="flex items-center gap-6">
                <div>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover bg-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300" />
                  )}
                </div>

                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition">
                      <Edit2 size={18} />
                      <span>Change profile</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    className="border-2 border-gray-300 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    onClick={() => {
                      setProfileImage(null);
                      setProfileImageFile(null);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Trainer fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block mb-2 text-gray-900 font-semibold">
                    Trainer Name*
                  </label>
                  <input
                    type="text"
                    name="trainerName"
                    placeholder="Enter Trainer Name"
                    value={formData.trainerName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-900 font-semibold">
                    Years Experience*
                  </label>
                  <input
                    type="number"
                    name="yearsExperience"
                    placeholder="e.g. 5"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-900 font-semibold">
                    Phone number*
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-900 font-semibold">
                    E-Mail I'd*
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-900 font-semibold">
                    Institutes Name*
                  </label>
                  <input
                    type="text"
                    name="instituteName"
                    placeholder="Enter Institute Name"
                    value={formData.instituteName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-900 font-semibold">
                    Certification*
                  </label>
                  <input
                    type="text"
                    name="certification"
                    placeholder="Enter Certification"
                    value={formData.certification}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-xl font-bold text-gray-900 pb-2">
                Add Address
              </h3>

              <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      Address*
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      Zip code*
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Enter Zip Code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      State*
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter State"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-900 font-semibold">
                    Website link <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="url"
                    name="websiteLink"
                    placeholder="Enter Website Link (Optional)"
                    value={formData.websiteLink}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-xl font-bold text-gray-900 pb-2">
                Add Management Details
              </h3>

              <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      Designation Details*
                    </label>
                    <input
                      type="text"
                      name="designation"
                      placeholder="Enter Designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-900 font-semibold">
                      Measurements*
                    </label>
                    <input
                      type="text"
                      name="measurements"
                      placeholder="Enter Measurements"
                      value={formData.measurements}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Previous
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Next
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                className="flex-1 bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
