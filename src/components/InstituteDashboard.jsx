// src/components/InstituteDashboard.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const billOptions = [
  "Utilities",
  "Telecom",
  "DTH",
  "Insurance",
  "Credit",
  "Fast tag",
  "Mutual",
  "Loan",
];

const InstituteDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const navigate = useNavigate();

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

    if (item === "Home") return;
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
        />
      );

    if (activeMenu === "Students Attendance")
      return <StudentsAttendancePage />;

    if (activeMenu === "Trainer’s Attendance")
      return <TrainersAttendancePage />;

    if (activeMenu === "Fees Details") return <FeesDetailsPage />;

    if (activeMenu === "Salary Details") return <SalaryDetailsPage />;

    if (activeMenu === "Add Trainer Details")
      return <AddTrainerDetailsPage />;

    if (activeMenu === "Add Student Details")
      return <AddStudentDetailsPage />;

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
          <h1 className="text-4xl font-extrabold mb-4">
            {activeMenu}
          </h1>
          <p className="text-lg text-orange-100 max-w-xl">
            This section will be connected to data later. For now,
            use the sidebar items like Attendance, Fees, Salary and
            Payments to explore the interactive features of the
            dashboard.
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
                "w-full text-left px-4 py-3 border-b border-orange-200 cursor-pointer transition-colors " +
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

/* ---------- Home / Institute Data ---------- */

const InstituteDataPage = ({
  students,
  trainers,
  onDeleteStudent,
  onDeleteTrainer,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeType, setActiveType] = useState("students");
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState(null);

  const handleSelect = (type) => {
    setActiveType(type);
    setOpenDropdown(false);
    setViewItem(null);
  };

  const filteredStudents = useMemo(
    () =>
      students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [students, search]
  );

  const filteredTrainers = useMemo(
    () =>
      trainers.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      ),
    [trainers, search]
  );

  return (
    <div className="h-full text-white">
      {/* search + icons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-[#3b2615] border border-[#6b4a2d] rounded-full px-4 py-2 w-full max-w-md">
          <span className="mr-2 text-lg text-gray-300">🔍</span>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-4 ml-6">
          <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-orange-500 text-xl">
            🔔
          </button>
          <button className="w-9 h-9 rounded-full bg-white" />
        </div>
      </div>

      {/* title + dropdown + date + add */}
      <div className="flex items-center justify-between mb-4 relative">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown((v) => !v)}
            className="flex items-center gap-1 text-3xl font-extrabold text-orange-400"
          >
            Institute Data
            <span className="text-xl">
              {openDropdown ? "▲" : "▼"}
            </span>
          </button>

          {openDropdown && (
            <div className="absolute mt-2 w-56 bg-[#ffc79a] text-black rounded-md shadow-lg z-10">
              <button
                type="button"
                onClick={() => handleSelect("students")}
                className={
                  "block w-full text-left px-4 py-3 hover:bg-orange-200 " +
                  (activeType === "students" ? "font-semibold" : "")
                }
              >
                Students Data
              </button>
              <button
                type="button"
                onClick={() => handleSelect("trainers")}
                className={
                  "block w-full text-left px-4 py-3 hover:bg-orange-200 " +
                  (activeType === "trainers" ? "font-semibold" : "")
                }
              >
                Trainer’s Data
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>📅</span>
            <span>Jan2026–Feb2026</span>
          </button>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>➕</span>
            <span>Add</span>
          </button>
        </div>
      </div>

      {activeType === "students" ? (
        <InstituteStudentsTable rows={filteredStudents} onDelete={onDeleteStudent} />
      ) : (
        <InstituteTrainersTable rows={filteredTrainers} onDelete={onDeleteTrainer} />
      )}

      <Pagination />

      {viewItem && (
        <div className="mt-6 bg-black/40 rounded-xl p-4 max-w-md">
          {/* details card (optional) */}
        </div>
      )}
    </div>
  );
};

/* ---------- Editable institute tables ---------- */

const InstituteStudentsTable = ({ rows, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: "", batch: "", phone: "" });
  const [localRows, setLocalRows] = useState(rows);

  useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  const startEdit = (row) => {
    setEditingId(row.id);
    setDraft({ name: row.name, batch: row.batch, phone: row.phone });
  };

  const saveOrStartEdit = (row) => {
    if (editingId === row.id) {
      setLocalRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, ...draft } : r))
      );
      setEditingId(null);
    } else {
      startEdit(row);
    }
  };

  const handleChange = (field, value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="bg-[#f9c199] rounded-t-xl overflow-hidden">
      <div className="grid grid-cols-4 gap-4 px-4 py-3 text-black font-semibold text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded border border-black bg-white" />
          <span>Students Name</span>
        </div>
        <div>Batch.No</div>
        <div>Phn.No</div>
        <div>Action</div>
      </div>

      <div className="bg-white text-black">
        {localRows.map((row) => {
          const isEditing = editingId === row.id;
          return (
            <div
              key={row.id}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-200 text-sm items-center"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#d6e4ff] border border-[#97b2ff]" />
                {isEditing ? (
                  <input
                    value={draft.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  <span>{row.name}</span>
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    value={draft.batch}
                    onChange={(e) => handleChange("batch", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  row.batch
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    value={draft.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  row.phone
                )}
              </div>

              <TableActions
                onDelete={() => onDelete(row.id)}
                onEditToggle={() => saveOrStartEdit(row)}
                isEditing={isEditing}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InstituteTrainersTable = ({ rows, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: "", category: "", phone: "" });
  const [localRows, setLocalRows] = useState(rows);

  useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  const startEdit = (row) => {
    setEditingId(row.id);
    setDraft({
      name: row.name,
      category: row.category,
      phone: row.phone,
    });
  };

  const saveOrStartEdit = (row) => {
    if (editingId === row.id) {
      setLocalRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, ...draft } : r))
      );
      setEditingId(null);
    } else {
      startEdit(row);
    }
  };

  const handleChange = (field, value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="bg-[#f9c199] rounded-t-xl overflow-hidden">
      <div className="grid grid-cols-4 gap-4 px-4 py-3 text-black font-semibold text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded border border-black bg-white" />
          <span>Trainers Name</span>
        </div>
        <div>Category</div>
        <div>Phn.No</div>
        <div>Action</div>
      </div>

      <div className="bg-white text-black">
        {localRows.map((row) => {
          const isEditing = editingId === row.id;
          return (
            <div
              key={row.id}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-200 text-sm items-center"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#d6e4ff] border border-[#97b2ff]" />
                {isEditing ? (
                  <input
                    value={draft.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  <span>{row.name}</span>
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    value={draft.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  row.category
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    value={draft.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  row.phone
                )}
              </div>

              <TableActions
                onDelete={() => onDelete(row.id)}
                onEditToggle={() => saveOrStartEdit(row)}
                isEditing={isEditing}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TableActions = ({ onDelete, onEditToggle, isEditing }) => (
  <div className="flex items-center gap-3 text-orange-500 text-lg">
    <button title="Delete" onClick={onDelete}>
      🗑️
    </button>
    <button title="Edit / Save" onClick={onEditToggle}>
      {isEditing ? "✅" : "✏️"}
    </button>
  </div>
);

/* ---------- Students Attendance ---------- */

const StudentsAttendancePage = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      batch: String(i + 1).padStart(2, "0"),
      present: i % 2 === 0,
    }))
  );

  const [search, setSearch] = useState("");

  const filteredRows = useMemo(
    () =>
      rows.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      ),
    [rows, search]
  );

  const toggle = (id, field) =>
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [field]: !r[field] } : r
      )
    );

  return (
    <div className="h-full bg-[#1b0f06] text-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-[#3b2615] border border-[#6b4a2d] rounded-full px-4 py-2 w-full max-w-md">
          <span className="mr-2 text-lg text-gray-300">🔍</span>
          <input
            type="text"
            placeholder="Search students attendance by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      <HeaderWithDate title="Students Attendance" />

      <div className="bg-[#f9c199] rounded-t-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-black font-semibold text-lg">
          <div className="flex items-center gap-2">
            
            <span>Students Name</span>
          </div>
          <div>Batch.No</div>
          <div>Present</div>
          <div>Absent</div>
        </div>
        <div className="bg-white text-black">
          {filteredRows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-200 text-sm items-center"
            >
              <div>{row.name}</div>
              <div>{row.batch}</div>
              <div>
                <button
                  onClick={() => toggle(row.id, "present")}
                  className={
                    "px-3 py-1 rounded-full text-xs font-semibold " +
                    (row.present
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700")
                  }
                >
                  Present
                </button>
              </div>
              <div>
                <button
                  onClick={() => toggle(row.id, "present")}
                  className={
                    "px-3 py-1 rounded-full text-xs font-semibold " +
                    (!row.present
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700")
                  }
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
};

/* ---------- Trainers Attendance ---------- */

const TrainersAttendancePage = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Trainer ${i + 1}`,
      batch: String(i + 1).padStart(2, "0"),
      present: i % 2 === 1,
    }))
  );

  const [search, setSearch] = useState("");

  const filteredRows = useMemo(
    () =>
      rows.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      ),
    [rows, search]
  );

  const toggle = (id, field) =>
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [field]: !r[field] } : r
      )
    );

  return (
    <div className="h-full bg-[#1b0f06] text-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-[#3b2615] border border-[#6b4a2d] rounded-full px-4 py-2 w-full max-w-md">
          <span className="mr-2 text-lg text-gray-300">🔍</span>
          <input
            type="text"
            placeholder="Search trainers attendance by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      <HeaderWithDate title="Trainers Attendance" />

      <div className="bg-[#f9c199] rounded-t-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-black font-semibold text-lg">
          <div className="flex items-center gap-2">
            <span>Trainers Name</span>
          </div>
          <div>Batch.No</div>
          <div>Present</div>
          <div>Absent</div>
        </div>
        <div className="bg-white text-black">
          {filteredRows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-gray-200 text-sm items-center"
            >
              <div>{row.name}</div>
              <div>{row.batch}</div>
              <div>
                <button
                  onClick={() => toggle(row.id, "present")}
                  className={
                    "px-3 py-1 rounded-full text-xs font-semibold " +
                    (row.present
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700")
                  }
                >
                  Present
                </button>
              </div>
              <div>
                <button
                  onClick={() => toggle(row.id, "present")}
                  className={
                    "px-3 py-1 rounded-full text-xs font-semibold " +
                    (!row.present
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700")
                  }
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
};

/* ---------- Fees Details ---------- */

const FeesDetailsPage = () => {
  const [mode, setMode] = useState("today");
  const [search, setSearch] = useState("");

  const baseRows = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i + 1,
        name: `Students Name ${i + 1}`,
        batch: "01",
        total: mode === "today" ? "5,000" : "50,000",
        paid: mode === "today" ? "3,000" : "30,000",
        pending: mode === "today" ? "2,000" : "20,000",
      })),
    [mode]
  );

  const filteredRows = useMemo(
    () =>
      baseRows.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      ),
    [baseRows, search]
  );

  return (
    <div className="h-full bg-white text-black p-6 rounded-lg">
      <TopSearchWithActionsLight search={search} setSearch={setSearch} />

      <div className="flex items-center justify-between mb-2">
        <FeesOrSalaryCharts
          totalLabel="Total Fees Amount"
          paidLabel="Total Fees Paid"
          pendingLabel="Total Fees Pending"
          peopleLabel="Total Students"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <ListHeader title="List of Collection" />
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setMode("today")}
            className={
              "px-3 py-1 rounded-full border " +
              (mode === "today"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300")
            }
          >
            Today
          </button>
          <button
            onClick={() => setMode("month")}
            className={
              "px-3 py-1 rounded-full border " +
              (mode === "month"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300")
            }
          >
            This Month
          </button>
        </div>
      </div>

      <AmountsTable rows={filteredRows} firstColLabel="Students Name" />

      <Pagination />
    </div>
  );
};

/* ---------- Salary Details ---------- */

const SalaryDetailsPage = () => {
  const [mode, setMode] = useState("today");
  const [search, setSearch] = useState("");

  const baseRows = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i + 1,
        name: `Trainers Name ${i + 1}`,
        batch: "01",
        total: mode === "today" ? "4,000" : "40,000",
        paid: mode === "today" ? "2,500" : "25,000",
        pending: mode === "today" ? "1,500" : "15,000",
      })),
    [mode]
  );

  const filteredRows = useMemo(
    () =>
      baseRows.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      ),
    [baseRows, search]
  );

  return (
    <div className="h-full bg-white text-black p-6 rounded-lg">
      <TopSearchWithActionsLight search={search} setSearch={setSearch} />

      <FeesOrSalaryCharts
        totalLabel="Total Salary Amount"
        paidLabel="Total Salary Paid"
        pendingLabel="Total Salary Pending"
        peopleLabel="Total Trainers"
      />

      <div className="flex items-center justify-between mb-2">
        <ListHeader title="List of Collection" />
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setMode("today")}
            className={
              "px-3 py-1 rounded-full border " +
              (mode === "today"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300")
            }
          >
            Today
          </button>
          <button
            onClick={() => setMode("month")}
            className={
              "px-3 py-1 rounded-full border " +
              (mode === "month"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300")
            }
          >
            This Month
          </button>
        </div>
      </div>

      <AmountsTable rows={filteredRows} firstColLabel="Trainers Name" />

      <Pagination />
    </div>
  );
};

/* ---------- Light search (controlled) ---------- */

const TopSearchWithActionsLight = ({ search, setSearch }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-full max-w-md">
      <span className="mr-2 text-lg text-gray-500">🔍</span>
      <input
        type="text"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
      />
    </div>
    <div className="flex items-center gap-4 ml-6">
      <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
        <span>➕</span>
        <span>Add</span>
      </button>
      <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-orange-500 text-xl border border-gray-300">
        🔔
      </button>
      <button className="w-9 h-9 rounded-full bg-white border border-gray-300" />
    </div>
  </div>
);

/* ---------- Editable Amounts table ---------- */

const AmountsTable = ({ rows, firstColLabel }) => {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({
    name: "",
    batch: "",
    total: "",
    paid: "",
    pending: "",
  });
  const [localRows, setLocalRows] = useState(rows);

  useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  const startEdit = (row) => {
    setEditingId(row.id);
    setDraft({
      name: row.name,
      batch: row.batch,
      total: row.total,
      paid: row.paid,
      pending: row.pending,
    });
  };

  const saveOrStartEdit = (row) => {
    if (editingId === row.id) {
      setLocalRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, ...draft } : r))
      );
      setEditingId(null);
    } else {
      startEdit(row);
    }
  };

  const handleChange = (field, value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="bg-[#f9c199] rounded-t-xl overflow-hidden">
      <div className="grid grid-cols-5 gap-4 px-4 py-3 text-black font-semibold text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded border border-black bg-white" />
          <span>{firstColLabel}</span>
        </div>
        <div>Batch.No</div>
        <div>Total Amount</div>
        <div>Paid</div>
        <div>Pending</div>
      </div>

      <div className="bg-white">
        {localRows.map((row) => {
          const isEditing = editingId === row.id;
          return (
            <div
              key={row.id}
              className="grid grid-cols-5 gap-4 px-4 py-3 border-t border-gray-200 text-sm items-center"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-gray-400 bg-white" />
                {isEditing ? (
                  <input
                    value={draft.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  <span>{row.name}</span>
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    value={draft.batch}
                    onChange={(e) => handleChange("batch", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  row.batch
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    value={draft.total}
                    onChange={(e) => handleChange("total", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  row.total
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    value={draft.paid}
                    onChange={(e) => handleChange("paid", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full"
                  />
                ) : (
                  row.paid
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                {isEditing ? (
                  <input
                    value={draft.pending}
                    onChange={(e) => handleChange("pending", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-full mr-2"
                  />
                ) : (
                  <span>{row.pending}</span>
                )}
                <button
                  onClick={() => saveOrStartEdit(row)}
                  className="text-xs font-semibold text-orange-500 underline"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Add Student Details (unchanged visual, with calendar) ---------- */

const AddStudentDetailsPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Student details saved (demo only).");
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#4b301b]">
      <div className="w-full max-w-4xl bg-white text-black rounded-xl shadow-lg px-12 py-10 relative">
        <button
          type="button"
          className="absolute top-5 right-6 text-2xl text-gray-500 hover:text-gray-700"
        >
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Add Student Details
          </h1>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-400"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-lg">
                  📅
                </span>
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone number
              </label>
              <input
                type="tel"
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

/* ---------- Add Trainer Details (unchanged visual, with calendar) ---------- */

const AddTrainerDetailsPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Trainer details saved (demo only).");
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#4b301b]">
      <div className="w-full max-w-4xl bg-[#4b301b] rounded-xl shadow-lg px-8 py-6">
        <div className="w-full h-full bg-white text-black rounded-xl px-10 py-8 relative">
          <button
            type="button"
            className="absolute top-5 right-6 text-2xl text-gray-500 hover:text-gray-700"
          >
          </button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold">
              Add Trainer Details
            </h1>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-lg">
                    📅
                  </span>
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Add certificates
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
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
    </div>
  );
};

/* ---------- Payments + reusable bits ---------- */

const PaymentsPage = () => (
  <>
    <div className="flex flex-wrap gap-6 mb-10">
      <PaymentCard title="Unpaid Bills" />
      <PaymentCard title="Future Bills" />
    </div>

    <h2 className="text-4xl font-extrabold text-orange-500 mb-8">
      Bill Payments
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
      {billOptions.map((label) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-gray-200" />
          <p className="mt-4 text-2xl font-semibold text-orange-500 text-center">
            {label}
          </p>
        </div>
      ))}
    </div>
  </>
);

const PaymentCard = ({ title }) => (
  <div className="bg-orange-500 text-white rounded-xl px-6 py-5 w-full md:w-96 shadow-lg">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-2xl">
        📄
      </div>
      <h3 className="text-3xl font-extrabold">{title}</h3>
    </div>
    <div className="space-y-1 text-sm leading-relaxed">
      <p className="font-semibold">Name</p>
      <p className="font-semibold">Due Amount</p>
      <p className="font-semibold">Due Date</p>
    </div>
  </div>
);

const HeaderWithDate = ({ title }) => (
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-extrabold text-orange-500">{title}</h1>
    <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
      <span>📅</span>
      <span>Jan2026–Feb2026</span>
    </button>
  </div>
);

const Pagination = () => (
  <div className="flex justify-center items-center gap-2 mt-4">
    <button className="text-orange-500 text-2xl">&lt;</button>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
      <button
        key={n}
        className={
          "w-8 h-8 rounded-md border text-sm font-semibold " +
          (n === 1
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white text-black border-black")
        }
      >
        {n}
      </button>
    ))}
    <button className="text-orange-500 text-2xl">&gt;</button>
  </div>
);

const FeesOrSalaryCharts = ({
  totalLabel,
  paidLabel,
  pendingLabel,
  peopleLabel,
}) => (
  <div className="flex flex-wrap gap-4 mb-6">
    <div className="bg-black rounded-2xl p-4 flex-1 min-w-[260px]">
      <div className="flex justify-between items-end h-40 gap-2">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
          (m, idx) => (
            <div key={m} className="flex flex-col items-center gap-1">
              <div
                className="w-6 bg-orange-500 rounded-t-md"
                style={{ height: `${40 + (idx % 4) * 15}px` }}
              />
              <span className="text-xs text-white mt-1">{m}</span>
            </div>
          )
        )}
      </div>
    </div>

    <div className="flex flex-col gap-3 min-w-[220px]">
      <SmallStatCard label={totalLabel} value="₹ 5,00,000" />
      <SmallStatCard label={paidLabel} value="₹ 3,00,000" />
      <SmallStatCard label={pendingLabel} value="₹ 2,00,000" />
      <SmallStatCard label={peopleLabel} value="8,000" />
    </div>
  </div>
);

const SmallStatCard = ({ label, value }) => (
  <div className="bg-black text-white rounded-xl px-4 py-3 text-sm">
    <p className="text-xs text-gray-300 mb-1">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const ListHeader = ({ title }) => (
  <div className="flex items-center justify-between mb-2">
    <h2 className="text-xl font-extrabold text-orange-500">{title}</h2>
    <div className="flex items-center gap-4 text-sm">
      <button className="flex items-center gap-1 text-gray-700">
        <span>📅</span>
        <span>Today</span>
      </button>
      <button className="text-gray-700">All Classes ▾</button>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold">
        Edit
      </button>
    </div>
  </div>
);

export default InstituteDashboard;
