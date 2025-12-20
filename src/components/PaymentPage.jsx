// src/components/PaymentPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const PaymentPage = () => {
  const [method, setMethod] = useState("none"); // none | credit | apple | gpay | phonepe
  const isCredit = method === "credit";
  const navigate = useNavigate();

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
      navigate("/dashboard");
      return;
    }

    if (item === "Payment Details") {
      return;
    }
  };

  return (
    // outer background now white, not grey/brown
    <div className="min-h-screen flex bg-white text-black">
      {/* Sidebar – same as dashboard */}
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

      {/* Main – white and full-height */}
      <main className="flex-1 bg-white text-black px-10 py-8 overflow-y-auto">
        <div className="bg-white text-black rounded-lg p-3 min-h-screen">
          {/* Top search + icons */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center flex-1 h-8 border border-gray-300 rounded bg-white text-xs">
              <span className="ml-2 mr-1 text-[11px]">🔍</span>
              <input className="flex-1 px-1 outline-none text-xs" />
            </div>
            <button className="w-8 h-8 rounded-full bg-orange-400 text-white text-xs flex items-center justify-center">
              ♥
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 text-xs flex items-center justify-center">
              🛒
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200" />
          </div>

          {/* Center: payment + summary */}
          <div className="flex border border-gray-200">
            {/* Payment section */}
            <section className="flex-[0.65] px-6 py-4 text-[13px] border-r border-gray-200">
              <p className="font-semibold mb-2">Shipping Address</p>

              {/* Grey address box */}
              <div className="border border-gray-300 rounded bg-white mb-4">
                <div className="h-40 px-6 py-4 space-y-3 flex flex-col justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-gray-300" />
                  ))}
                </div>
              </div>

              <p className="font-semibold mb-2">Payment Options</p>

              {/* payment options grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <button
                  type="button"
                  onClick={() => setMethod("credit")}
                  className={
                    "border rounded px-3 py-2 flex items-center gap-2 " +
                    (isCredit
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300")
                  }
                >
                  <span
                    className={
                      "w-3 h-3 rounded-full border " +
                      (isCredit
                        ? "border-orange-500 bg-orange-500"
                        : "border-orange-500")
                    }
                  />
                  Credit/debit
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("apple")}
                  className={
                    "border rounded px-3 py-2 flex items-center gap-2 " +
                    (method === "apple"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300")
                  }
                >
                  <span
                    className={
                      "w-3 h-3 rounded-full border " +
                      (method === "apple"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-400")
                    }
                  />
                  Pay
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("gpay")}
                  className={
                    "border rounded px-3 py-2 flex items-center gap-2 " +
                    (method === "gpay"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300")
                  }
                >
                  <span
                    className={
                      "w-3 h-3 rounded-full border " +
                      (method === "gpay"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-400")
                    }
                  />
                  G Pay
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("phonepe")}
                  className={
                    "border rounded px-3 py-2 flex items-center gap-2 " +
                    (method === "phonepe"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300")
                  }
                >
                  <span
                    className={
                      "w-3 h-3 rounded-full border " +
                      (method === "phonepe"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-400")
                    }
                  />
                  Phone pe
                </button>
              </div>

              {/* Credit card fields */}
              {isCredit && (
                <div className="mb-4 border-t border-gray-200 pt-3">
                  <p className="text-orange-500 font-semibold mb-2">
                    Credit/Debit Card
                  </p>

                  <div className="mb-3">
                    <input
                      placeholder="Card Number"
                      className="w-full h-8 border border-gray-300 rounded px-3 text-xs"
                    />
                  </div>

                  <div className="flex gap-3">
                    <input
                      placeholder="dd/mm/yy"
                      className="flex-1 h-8 border border-gray-300 rounded px-3 text-xs"
                    />
                    <input
                      placeholder="CCV"
                      className="flex-1 h-8 border border-gray-300 rounded px-3 text-xs"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-4 mb-2">
                <button className="w-64 h-9 bg-orange-500 text-white text-xs font-semibold rounded">
                  Place Order
                </button>
              </div>

              <p className="text-xs mt-1">
                <Link to="/addresspage" className="text-blue-600 underline">
                  ← Back to Address
                </Link>
              </p>
            </section>

            {/* Order summary */}
            <aside className="flex-[0.35] px-5 py-3 text-[12px]">
              <h3 className="text-orange-500 font-semibold mb-2.5">
                Order Summary
              </h3>

              <div className="space-y-2.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div className="flex items-center gap-3" key={idx}>
                    <div className="w-10 h-10 bg-gray-300" />
                    <div className="flex-1 leading-tight">
                      <p className="text-[11px] font-semibold">Product Name</p>
                      <p className="text-[11px]">Qty 1</p>
                    </div>
                    <span className="text-[11px] font-semibold">₹</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Sub Total</span>
                  <span>₹</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      className="h-6 w-24 border border-gray-300 px-2 text-[11px]"
                      placeholder=""
                    />
                    <button className="h-6 px-3 bg-orange-400 text-white text-[11px] rounded">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-2 mt-1">
                  <span className="font-semibold">Grand Total</span>
                  <span className="font-semibold">₹</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
