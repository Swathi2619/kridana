// PricePlansFull.jsx
import React, { useState } from "react";

const FEATURES = [
  "Attendance Tracking",
  "Fees Payment Tracking",
  "Reports Generator",
  "Check Attendance",
];

const MONTHLY_PLANS = [
  { name: "Basic (Trainers)", price: "₹0 Free", period: "one month" },
  { name: "Standard (Trainers)", price: "₹299", period: "per month" },
  { name: "Basic (Institutes)", price: "₹0 Free", period: "one month" },
  { name: "Standard (Institutes)", price: "₹699", period: "per month" },
];

const ANNUAL_PLANS = [
  { name: "Basic (Trainers)", price: "₹0 Free", period: "one month" },
  { name: "Standard (Trainers)", price: "₹3,588", period: "per year" },
  { name: "Basic (Institutes)", price: "₹0 Free", period: "one month" },
  { name: "Standard (Institutes)", price: "₹8,388", period: "per year" },
];

const PricePlansFull = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = isAnnual ? ANNUAL_PLANS : MONTHLY_PLANS;

  return (
    <div className="min-h-screen w-full">
      {/* Full-screen gradient background */}
      <div className="min-h-screen w-full bg-gradient-to-b from-[#c85a1e] via-[#a34917] to-[#3b1d0a] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-start pt-16 pb-16 px-4 sm:px-10">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Get Started
            </h1>
            <p className="text-sm sm:text-base text-orange-100">
              Start for free, pick a plan later. Ready to be part of the future
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-[#2b1508] rounded-full p-1 shadow-lg">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={
                  "px-6 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all " +
                  (!isAnnual
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-orange-100 hover:text-white")
                }
              >
                Monthly Plan
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={
                  "px-6 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all " +
                  (isAnnual
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-orange-100 hover:text-white")
                }
              >
                Annual Plan
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={
                  "bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transition-transform duration-200 hover:shadow-xl hover:-translate-y-1 min-h-[340px] flex flex-col " +
                  (idx === 1 || idx === 3 ? "relative" : "")
                }
              >
                {(idx === 1 || idx === 3) && (
                  <span className="absolute top-2 right-3 text-[10px] font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}

                {/* Header */}
                <div className="px-5 pt-4 pb-3 border-b border-gray-200">
                  <p className="text-[11px] font-semibold text-gray-700">
                    {plan.name}
                  </p>
                  <p className="text-xl font-extrabold mt-2 text-gray-900">
                    {plan.price}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {plan.period}
                  </p>
                </div>

                {/* Features – take remaining height */}
                <ul className="px-5 py-4 space-y-2 text-[12px] text-gray-800 flex-1">
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePlansFull;
