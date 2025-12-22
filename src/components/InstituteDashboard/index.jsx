// src/components/InstituteDashboard/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstituteDataPage from "./InstituteDataPage";
import StudentsAttendancePage from "./StudentsAttendancePage";
import TrainersAttendancePage from "./TrainersAttendancePage";
import FeesDetailsPage from "./FeesDetailsPage";
import SalaryDetailsPage from "./SalaryDetailsPage";
import AddTrainerDetailsPage from "./AddTrainerDetailsPage";
import AddStudentDetailsPage from "./AddStudentDetailsPage";
import PaymentsPage from "./PaymentsPage";
import ClassTime from "./ClassTime";

const sidebarItems = [
  "Home",
  "Students Attendance",
  "Trainer's Attendance",
  "Fees Details",
  "Salary Details",
  "Add Trainer Details",
  "Add Student Details",
  "Class Timings",
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

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");

  const [students, setStudents] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      batch: String(i + 1).padStart(2, "0"),
      phone: "+91 99999 00000",
    }))
  );

  const [trainers, setTrainers] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Trainer ${i + 1}`,
      category: i === 1 ? "Cricket" : i === 2 ? "Volley Ball" : "Karate",
      phone: "+91 88888 00000",
    }))
  );

  const handleMenuClick = (item) => {
    setActiveMenu(item);

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
  };

  // ---- Add helpers shared across pages ----
  const addStudentFromForm = (student) => {
    setStudents((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1;
      const nextBatch = String(prev.length + 1).padStart(2, "0");
      return [...prev, { id: nextId, batch: nextBatch, ...student }];
    });
  };

  const addTrainerFromForm = (trainer) => {
    setTrainers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      return [...prev, { id: nextId, ...trainer }];
    });
  };

  const addStudentQuick = () => {
    setStudents((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1;
      const nextBatch = String(prev.length + 1).padStart(2, "0");
      return [
        ...prev,
        {
          id: nextId,
          name: `Student ${nextId}`,
          batch: nextBatch,
          phone: "+91 99999 00000",
        },
      ];
    });
  };

  const addTrainerQuick = () => {
    setTrainers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextId,
          name: `Trainer ${nextId}`,
          category: "Cricket",
          phone: "+91 88888 00000",
        },
      ];
    });
  };

  const renderMainContent = () => {
    if (activeMenu === "Home")
      return (
        <InstituteDataPage
          students={students}
          trainers={trainers}
          onDeleteStudent={(id) =>
            setStudents((prev) => prev.filter((s) => s.id !== id))
          }
          onDeleteTrainer={(id) =>
            setTrainers((prev) => prev.filter((t) => t.id !== id))
          }
          onAddStudent={addStudentQuick}
          onAddTrainer={addTrainerQuick}
        />
      );

    if (activeMenu === "Class Timings") return <ClassTime />;

    if (activeMenu === "Students Attendance")
      return <StudentsAttendancePage students={students} />;

    if (activeMenu === "Trainer's Attendance")
      return <TrainersAttendancePage trainers={trainers} />;

    if (activeMenu === "Fees Details") return <FeesDetailsPage />;

    if (activeMenu === "Salary Details") return <SalaryDetailsPage />;

    if (activeMenu === "Add Trainer Details")
      return (
        <AddTrainerDetailsPage onAddTrainer={addTrainerFromForm} />
      );

    if (activeMenu === "Add Student Details")
      return (
        <AddStudentDetailsPage onAddStudent={addStudentFromForm} />
      );

    if (activeMenu === "Payment Details") return <PaymentsPage />;

    if (
      [
        "Inbox",
        "Categories",
        "Reports",
        "Terms & Conditions",
        "Privacy Policy",
      ].includes(activeMenu)
    ) {
      return (
        <div className="text-white">
          <h1 className="text-4xl font-extrabold mb-4">{activeMenu}</h1>
          <p className="text-lg text-orange-100 max-w-xl">
            This section will be connected to data later. For now, use the
            sidebar items like Attendance, Fees, Salary and Payments to
            explore the interactive features of the dashboard.
          </p>
        </div>
      );
    }

    return <InstituteDataPage students={students} trainers={trainers} />;
  };

  return (
    <div className="min-h-screen flex bg-[#5a5a5a] text-white">
      {/* Sidebar */}
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
              className={
                "w-full text-left px-4 py-3 border-b border-orange-200 cursor-pointer transition-colors text-lg " +
                (item === activeMenu
                  ? "bg-orange-500 text-white font-semibold"
                  : "hover:bg-orange-200")
              }
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-[#4b301b] text-white px-10 py-8 overflow-y-auto">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default InstituteDashboard;
