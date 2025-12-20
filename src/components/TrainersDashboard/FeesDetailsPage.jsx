// src/components/TrainersFeesDetailsPage.jsx
import React, { useState, useMemo } from "react";
import {
  TopSearchWithActionsLight,
  ListHeader,
  AmountsTable,
  Pagination,
} from "./shared";

const TrainersFeesDetailsPage = () => {
  const [mode, setMode] = useState("today"); // today | month
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const baseRows = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i + 1,
        name: `Trainers Name ${i + 1}`,
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
      {/* Top search bar */}
      <TopSearchWithActionsLight search={search} setSearch={setSearch} />

      {/* Graph + 4 boxes for trainer fees */}
      <div className="mb-6">
        <div className="w-full bg-black rounded-2xl p-5 flex gap-4">
          {/* Bar chart */}
          <div className="flex-[0.9] min-w-[260px] bg-black rounded-xl flex items-end justify-between px-6 py-4">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
              (m, idx) => (
                <div key={m} className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 bg-orange-500 rounded-t-md"
                    style={{ height: `${70 + (idx % 4) * 15}px` }}
                  />
                  <span className="text-xs text-white mt-1">{m}</span>
                </div>
              )
            )}
          </div>

          {/* Stat boxes */}
          <div className="flex flex-col gap-3 flex-[1] min-w-[260px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StatBox label="Total Fees Amount" value="5,00,000" />
              <StatBox label="Total Fees Paid" value="3,00,000" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StatBox label="Total Fees Pending" value="2,00,000" />
              <StatBox label="Total Trainers" value="8,000" />
            </div>
          </div>
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        {/* Left: title only */}
        <ListHeader title="List of Trainer Payments" />

        {/* Right: calendar + Today + All Classes */}
        <div className="flex items-center gap-4 text-sm">
          {/* Calendar icon + date input */}
          <div className="flex items-center gap-2">
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setMode("today");
              }}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
            />
          </div>

          {/* Today button */}
          <button
            onClick={() => setMode("today")}
            className={
              "px-4 py-1.5 rounded-full border text-sm " +
              (mode === "today"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300")
            }
          >
            Today
          </button>

          {/* All Classes dropdown */}
          <button
            type="button"
            className="px-4 py-1.5 rounded-full border border-gray-300 bg-white text-gray-800 text-sm flex items-center gap-1"
          >
            <span>All Classes</span>
            <span className="text-xs">▼</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <AmountsTable rows={filteredRows} firstColLabel="Trainers Name" />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

/* Same style stat box used in other pages */
const StatBox = ({ label, value }) => (
  <div className="bg-black text-white rounded-xl px-4 py-3 text-sm flex flex-col justify-between">
    <div className="text-xs text-gray-300 mb-1">{label}</div>
    <div className="text-lg font-bold">
      <span className="align-middle">₹</span>{" "}
      <span className="align-middle">{value}</span>
    </div>
  </div>
);

export default TrainersFeesDetailsPage;
