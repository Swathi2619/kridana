import React from "react";

export default function ViewTrainers() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* TOP GREY SECTION */}
      <section className="w-full h-[620px] bg-[#d9d9d9] mt-12" />

      {/* DETAILS SECTION */}
      <section className="w-full bg-white py-12 px-6 md:px-16 lg:px-24">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-[48px] font-bold text-[#ff7a00] border-b-4 border-[#ff7a00] pb-2">
            Institute Details
          </h1>
          <button className="bg-[#ff7a00] text-white border-none px-8 py-4 text-[22px] font-semibold rounded-xl cursor-pointer">
            View Trainers
          </button>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-[18px] shadow-[0_6px_14px_rgba(0,0,0,0.2)] overflow-hidden border-2 border-[#ddd]"
            >
              {/* IMAGE */}
              <div
                className="h-[220px]"
                style={{
                  background:
                    "repeating-conic-gradient(#eee 0% 25%, #f7f7f7 0% 50%) 50% / 40px 40px",
                }}
              />

              {/* CONTENT */}
              <div className="p-6">
                <h2 className="text-[26px] font-bold text-center mb-1">
                  Institute Name
                </h2>
                <p className="text-[20px] text-center text-[#555] mb-5">
                  Category
                </p>

                <div className="flex items-center gap-[14px] text-[20px] font-semibold mb-[14px]">
                  <span className="w-[42px] h-[42px] rounded-full bg-[#f1f1f1] flex items-center justify-center text-[20px]">
                    📍
                  </span>
                  <span>Location</span>
                </div>

                <div className="flex items-center gap-[14px] text-[20px] font-semibold mb-[14px]">
                  <span className="w-[42px] h-[42px] rounded-full bg-[#f1f1f1] flex items-center justify-center text-[20px]">
                    ⭐
                  </span>
                  <span>Rating</span>
                </div>

                <div className="flex items-center gap-[14px] text-[20px] font-semibold mb-[14px]">
                  <span className="w-[42px] h-[42px] rounded-full bg-[#f1f1f1] flex items-center justify-center text-[20px]">
                    👤
                  </span>
                  <span>+91</span>
                </div>

                <div className="flex items-center gap-[14px] text-[20px] font-semibold mb-[14px]">
                  <span className="w-[42px] h-[42px] rounded-full bg-[#f1f1f1] flex items-center justify-center text-[20px]">
                    ✉️
                  </span>
                  <span>abc@gmail.com</span>
                </div>

                <button className="mt-5 w-full bg-[#ff7a00] text-white border-none py-[14px] text-[22px] font-semibold rounded-xl cursor-pointer">
                  Contact Institutes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
