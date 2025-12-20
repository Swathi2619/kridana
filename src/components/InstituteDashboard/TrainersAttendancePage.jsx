import React, { useState, useMemo } from "react";
import { Pagination } from "./shared";
import MonthRangePicker from "../MonthRangePicker";

const TrainersAttendancePage = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Trainer ${i + 1}`,
      category: i === 1 ? "Cricket" : i === 2 ? "Volley Ball" : "Karate",
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

  const handleRangeChange = (range) => {
    console.log("Institute TrainersAttendance range:", range);
  };

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

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold text-orange-500">
          Trainer’s Attendance
        </h1>
        <MonthRangePicker onChange={handleRangeChange} />
      </div>

      <div className="bg-[#f9c199] rounded-t-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-black font-semibold text-lg">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded border border-black bg-white" />
            <span>Trainers Name</span>
          </div>
          <div>Category</div>
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
              <div>{row.category}</div>
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

export default TrainersAttendancePage;
