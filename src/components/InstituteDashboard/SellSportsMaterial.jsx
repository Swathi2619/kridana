// src/components/InstituteDashboard/SellSportsMaterial.jsx
import React, { useState } from "react";

const SellSportsMaterial = () => {
  const [businessDetails, setBusinessDetails] = useState({
    legalBusinessName: "",
    businessType: "",
    registeredBusinessAddress: "",
    emailBusiness: "",
    panCardNumber: "",
    gstin: "",
    gstinNumber: "",
    authorizedContactPersonName: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
      {/* SIMPLIFIED HEADER - NO BORDER */}
      <div className="flex items-center justify-between mb-12 p-4">
        <h1 className="text-3xl font-black text-gray-900">
          Provide Your Business Details
        </h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-xl text-sm shadow-md hover:shadow-lg transition-all">
          Sell a Product
        </button>
      </div>

      <form onSubmit={handleNext}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Legal Business Name</label>
            <input name="legalBusinessName" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
            <input name="businessType" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Registered Business Address</label>
            <input name="registeredBusinessAddress" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail id (Business)</label>
            <input name="emailBusiness" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">PAN card number</label>
            <input name="panCardNumber" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">GSTIN</label>
            <input name="gstin" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">GSTIN Number (if yes)</label>
            <input name="gstinNumber" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Authorized Contact Person Name</label>
            <input name="authorizedContactPersonName" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
            <input name="mobileNumber" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-xl">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellSportsMaterial;
