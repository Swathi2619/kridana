// src/components/AddAddressPage.jsx
import React from "react";
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

const AddAddressPage = () => {
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
      navigate("/dashboard"); // adjust route name if different
      return;
    }

    if (item === "Payment Details") {
      navigate("/payment");
      return;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#5a5a5a] text-white">
      {/* Sidebar – same look as InstituteDashboard */}
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
                "w-full text-left px-4 py-3 border-b border-orange-200 cursor-pointer transition-colors hover:bg-orange-200"
              }
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      {/* Main – put your existing white card UI inside */}
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

          {/* Center: Address form + Order summary */}
          <div className="flex border border-gray-200">
            {/* Address form */}
            <section className="flex-[0.65] px-6 py-4 text-[13px] border-r border-gray-200">
              <p className="text-orange-500 font-semibold mb-1">Contact</p>
              <input
                type="email"
                placeholder="Enter E-mail"
                className="w-full h-8 border border-gray-300 rounded px-3 text-xs mb-3"
              />

              <p className="text-orange-500 font-semibold text-center mb-3">
                Shipping Address
              </p>

              <div className="flex gap-3 mb-2.5">
                <input
                  placeholder="Full Name"
                  className="flex-1 h-8 border border-gray-300 rounded px-3 text-xs"
                />
                <input
                  placeholder="Phone Number"
                  className="flex-1 h-8 border border-gray-300 rounded px-3 text-xs"
                />
              </div>

              <input
                placeholder="Enter Address"
                className="w-full h-8 border border-gray-300 rounded px-3 text-xs mb-2.5"
              />
              <input
                placeholder="Apartment Details"
                className="w-full h-8 border border-gray-300 rounded px-3 text-xs mb-2.5"
              />

              <div className="flex gap-3 mb-3">
                <input
                  placeholder="City"
                  className="flex-1 h-8 border border-gray-300 rounded px-3 text-xs"
                />
                <input
                  placeholder="State"
                  className="flex-1 h-8 border border-gray-300 rounded px-3 text-xs"
                />
                <input
                  placeholder="ZIP Code"
                  className="flex-1 h-8 border border-gray-300 rounded px-3 text-xs"
                />
              </div>

              <div className="flex justify-center mt-8 mb-2.5">
                <button className="w-64 h-9 bg-orange-500 text-white text-xs font-semibold rounded">
                  Save &amp; Continue
                </button>
              </div>

              <p className="text-xs mt-1">
                Go to{" "}
                <Link to="/payment" className="text-blue-600 underline">
                  Payment Method
                </Link>
              </p>
            </section>

            {/* Order Summary */}
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

export default AddAddressPage;
