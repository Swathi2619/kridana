import React, { useState } from "react";

const AddStudentDetailsPage = ({ onAddStudent }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    category: "",
    joinedDate: "",
    email: "",
    phone: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName.trim()) {
      alert("Please enter first name");
      return;
    }

    const newStudent = {
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      category: form.category.trim(),
      joinedDate: form.joinedDate,
      email: form.email.trim(),
      phone: form.phone.trim() || "+91 99999 00000",
    };

    if (onAddStudent) {
      onAddStudent(newStudent);
    }

    alert("Student details saved (demo).");

    setForm({
      firstName: "",
      lastName: "",
      category: "",
      joinedDate: "",
      email: "",
      phone: "",
    });
  };

  const handleAddClick = () => {
    const fakeEvent = { preventDefault: () => {} };
    handleSubmit(fakeEvent);
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#4b301b]">
      <div className="w-full max-w-4xl bg-white text-black rounded-xl shadow-lg px-12 py-10 relative">
        <button
          type="button"
          className="absolute top-5 right-6 text-2xl text-gray-500 hover:text-gray-700"
        >
          {/* close icon could go here */}
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Add Student Details
          </h1>

          {/* + Add triggers same logic as Save */}
          <button
            type="button"
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            <span>➕</span>
            <span>Add</span>
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Joined Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={form.joinedDate}
                  onChange={(e) => handleChange("joinedDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-16 py-3 rounded-md text-lg font-extrabold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentDetailsPage;
