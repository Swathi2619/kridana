import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClassTime() {
  const navigate = useNavigate();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const timeSlots = [
    "09:00am",
    "10:00am",
    "11:00am",
    "12:00pm",
    "01:00pm",
    "02:00pm",
    "03:00pm",
    "04:00pm",
    "05:00pm",
    "06:00pm",
  ];

  const colors = {
    orange: "#f58e2eff",
    green : "#91f37bff",
    blue: "#7fccf2ff",
    pink: "#f666b7ff",
    yellow: "#f8e542ff",
  };

  const [scheduleData, setScheduleData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    day: "Mon",
    time: "09:00am",
    title: "",
    color: "orange",
  });

  const sidebarItems = [
    "Home",
    "Students Attendance",
    "Trainer’s Attendance",
    "Fees Details",
    "Salary Details",
    "Add Trainer Details",
    "Add Student Details",
    "Inbox",
    "Shop",
    "Edit Profile",
    "Categories",
    "Reports",
    "Payment Details",
    "Terms & Conditions",
    "Privacy Policy",
    "Log Out",
  ];

  const handleMenuClick = (item) => {
    if (item === "Log Out") {
      navigate("/logout");
      return;
    }
    if (item === "Shop") {
      navigate("/shop");
      return;
    }
    if (item === "Edit Profile") {
      navigate("/institute-signup");
      return;
    }
    if (item === "Home") {
      navigate("/dashboard"); // change to your dashboard route
      return;
    }
    if (item === "Payment Details") {
      navigate("/payment");
      return;
    }
    // other items can be wired later
  };

  // Add or Update class
  const saveClass = () => {
    if (!form.title) return alert("Enter class name");

    setScheduleData((prev) => ({
      ...prev,
      [form.day]: {
        ...prev[form.day],
        [form.time]: { title: form.title, color: form.color },
      },
    }));

    setShowModal(false);
    setForm({ day: "Mon", time: "09:00am", title: "", color: "orange" });
  };

  // Edit class
  const editClass = (day, time, item) => {
    setForm({ day, time, title: item.title, color: item.color });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex bg-[#5a5a5a] text-white">
      {/* Sidebar – same style as InstituteDashboard */}
      <aside className="w-72 bg-orange-900 flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4 bg-orange-900 border-b border-orange-800">
          <div className="w-10 h-10 rounded-full bg-orange-700" />
          <span className="text-xl font-extrabold text-white">
            Institute name
          </span>
        </div>

        <div className="flex-1 bg-orange-100 text-black text-lg overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleMenuClick(item)}
              className="w-full text-left px-4 py-3 border-b border-orange-200 cursor-pointer transition-colors hover:bg-orange-200"
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-[#4b301b] text-white px-10 py-8 overflow-y-auto">
        <div className="bg-white text-black rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Class Schedule</h2>
            <button
              className="bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
              onClick={() => setShowModal(true)}
            >
              + Add Class
            </button>
          </div>

          {/* Grid */}
          <div className="grid gap-3" style={{ gridTemplateColumns: "110px repeat(7, 1fr)" }}>
            <div />
            {days.map((day) => (
              <div
                key={day}
                className="bg-black text-white text-center py-2 rounded-lg text-sm font-semibold"
              >
                {day}
              </div>
            ))}

            {timeSlots.map((time) => (
              <React.Fragment key={time}>
                <div className="bg-black text-white text-center py-2 rounded-lg text-sm font-semibold">
                  {time}
                </div>
                {days.map((day) => {
                  const item = scheduleData[day]?.[time];
                  return (
                    <div
                      key={day + time}
                      className="min-h-12 flex justify-center items-center"
                    >
                      {item && (
                        <span
                          className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer min-w-[110px] text-center"
                          style={{ background: colors[item.color] }}
                          onClick={() => editClass(day, time, item)}
                        >
                          {item.title}
                        </span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white text-black rounded-xl p-6 w-80 flex flex-col gap-3">
              <h3 className="text-lg font-semibold mb-1">Add / Edit Class</h3>

              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
              >
                {days.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              >
                {timeSlots.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <input
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Class Name"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
              >
                {Object.keys(colors).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <div className="flex justify-between mt-2">
                <button
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold"
                  onClick={saveClass}
                >
                  Save
                </button>
                <button
                  className="text-sm text-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
