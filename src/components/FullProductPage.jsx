import React from "react";

const FullProductPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-600 flex">
      {/* Left peach panel (full height) */}
      <aside className="w-64 bg-orange-200" />

      {/* Right main area */}
      <main className="flex-1 bg-white flex flex-col px-6 pt-3 pb-6">
        {/* Top row: back + search + icons */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="text-xs text-orange-500 underline mr-2"
          >
            ← Back
          </button>

          {/* Search box */}
          <div className="flex items-center flex-1 h-8 border border-gray-300 rounded-sm bg-white text-xs">
            <span className="ml-2 mr-1 text-[11px] text-blue-500">🔍</span>
            <input
              className="flex-1 px-1 outline-none text-xs"
              placeholder="Search"
            />
          </div>

          {/* Icons on right */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-orange-400 text-white text-xs flex items-center justify-center">
              ♥
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 text-xs flex items-center justify-center">
              🛒
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Big grey block filling remaining space */}
        <div className="flex-1 bg-gray-300" />
      </main>
    </div>
  );
};

export default FullProductPage;
