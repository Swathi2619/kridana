// src/components/MonthRangePicker.jsx
import React, { useState } from "react";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatRange = (start, end, year) => {
  if (start == null || end == null) return "Select range";
  return `${monthNamesShort[start]}${year}–${monthNamesShort[end]}${year}`;
};

const MonthRangePicker = ({
  year = 2026,
  initialStart = 0,
  initialEnd = 1,
  onChange,
}) => {
  const [startMonthIndex, setStartMonthIndex] = useState(initialStart);
  const [endMonthIndex, setEndMonthIndex] = useState(initialEnd);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selecting, setSelecting] = useState("start");

  const rangeLabel = formatRange(startMonthIndex, endMonthIndex, year);

  const handleMonthClick = (index) => {
    if (selecting === "start") {
      setStartMonthIndex(index);
      setSelecting("end");
    } else {
      setEndMonthIndex(index);
      setPickerOpen(false);
      setSelecting("start");
      if (onChange) {
        onChange({
          year,
          startMonthIndex,
          endMonthIndex: index,
        });
      }
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setPickerOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold"
      >
        <span>📅</span>
        <span>{rangeLabel}</span>
      </button>

      {pickerOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white text-black rounded-xl shadow-lg p-3 z-10">
          <div className="flex items-center justify-between mb-2 text-sm font-semibold">
            <span>{year}</span>
            <span className="text-xs text-gray-500">
              {selecting === "start"
                ? "Select start month"
                : "Select end month"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {monthNamesShort.map((m, idx) => {
              const isSelected =
                idx === startMonthIndex || idx === endMonthIndex;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMonthClick(idx)}
                  className={
                    "border rounded-md px-2 py-1 " +
                    (isSelected
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-orange-50")
                  }
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthRangePicker;
