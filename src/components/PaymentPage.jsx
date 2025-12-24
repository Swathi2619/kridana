// src/components/PaymentPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const PaymentPage = () => {
  const [method, setMethod] = useState("none"); // none | credit | apple | gpay | phonepe
  const isCredit = method === "credit";
  const navigate = useNavigate();
  const { cartItems, total } = useCart();
  const grandTotal = total;

  const handleBackToAddress = () => {
    navigate("/AddressPage");
  };

  const handlePlaceOrder = () => {
    if (method === "none") {
      alert("Please select a payment method.");
      return;
    }
    alert("Order placed successfully!");
    // optional: clear cart / redirect here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* same size as address card */}
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Payment</h1>
          <span className="text-xs text-gray-500">
            Step 2 of 2 · Payment &amp; Order Summary
          </span>
        </div>

        {/* main content with equal padding */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Payment section */}
            <section className="flex-[0.6] text-[13px] border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-2">Shipping Address</p>

              {/* placeholder address box */}
              <div className="border border-gray-300 rounded bg-white mb-4">
                <div className="h-32 px-6 py-4 space-y-2 flex flex-col justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-3/4 h-3 rounded bg-gray-200" />
                  ))}
                </div>
              </div>

              <p className="font-semibold mb-2">Payment Options</p>

              {/* payment options */}
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
                  Credit / Debit Card
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
                  <span className="text-sm font-semibold">Pay</span>
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
                  GPay
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
                  PhonePe
                </button>
              </div>

              {/* Credit card fields */}
              {isCredit && (
                <div className="mb-4 border-t border-gray-200 pt-3">
                  <p className="text-orange-500 font-semibold mb-2">
                    Credit / Debit Card Details
                  </p>

                  <div className="mb-3">
                    <input
                      placeholder="Card Number"
                      className="w-full h-9 border border-gray-300 rounded px-3 text-xs"
                    />
                  </div>

                  <div className="flex gap-3">
                    <input
                      placeholder="MM/YY"
                      className="flex-1 h-9 border border-gray-300 rounded px-3 text-xs"
                    />
                    <input
                      placeholder="CVV"
                      className="flex-1 h-9 border border-gray-300 rounded px-3 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* bottom buttons */}
              <div className="flex items-center justify-between gap-3 mt-6">
                <button
                  onClick={handleBackToAddress}
                  className="w-40 h-9 border border-gray-300 text-xs font-semibold rounded text-gray-700 hover:bg-gray-100 transition"
                >
                  ← Back to Address
                </button>

                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 h-9 bg-orange-500 text-white text-xs font-semibold rounded hover:bg-orange-600 transition"
                >
                  Place Order
                </button>
              </div>
            </section>

            {/* Order Summary */}
            <aside className="flex-[0.4] text-[12px] border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="text-orange-500 font-semibold mb-2.5">
                Order Summary
              </h3>

              {cartItems.length === 0 ? (
                <p className="text-xs text-gray-500 mb-3">
                  Your cart is empty. Add items from the shop to see them here.
                </p>
              ) : (
                <div className="space-y-3 mb-3 max-h-56 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div className="flex items-center gap-3" key={item.id}>
                      <div className="w-9 h-9 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-500">
                        {item.name.slice(0, 2)}
                      </div>
                      <div className="flex-1 leading-tight">
                        <p className="text-[11px] font-semibold truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Qty {item.qty} · ₹{" "}
                          {item.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold">
                        ₹ {(item.price * item.qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-200 pt-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-[12px]">
                  <span>Sub Total</span>
                  <span>₹ {total.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <input
                      className="h-7 w-24 border border-gray-300 px-2 text-[11px]"
                      placeholder="Coupon"
                    />
                    <button className="h-7 px-3 bg-orange-400 text-white text-[11px] rounded">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[12px]">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-2 mt-1">
                  <span className="font-semibold text-[12px]">
                    Grand Total
                  </span>
                  <span className="font-semibold text-[12px]">
                    ₹ {grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
