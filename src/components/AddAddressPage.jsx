// src/components/AddAddressPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const AddAddressPage = () => {
  const { cartItems, total } = useCart();
  const navigate = useNavigate();
  const grandTotal = total;

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinueToPayment = () => {
    // Basic validation
    if (!formData.fullName || !formData.address || !formData.city || !formData.state) {
      alert("Please fill in all required fields (Name, Address, City, State)");
      return;
    }

    // Format address for PaymentPage
    const formattedAddress = [
      formData.fullName,
      formData.address,
      formData.apartment ? formData.apartment : "",
      `${formData.city}, ${formData.state} ${formData.zip}`,
      `Phone: ${formData.phone}`
    ]
    .filter(line => line.trim()) // Remove empty lines
    .join("\n");

    // Navigate with address state
    navigate("/Payment", { state: { address: formattedAddress } });
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* bigger card */}
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* header with equal horizontal padding */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            Delivery Address
          </h1>
          <span className="text-xs text-gray-500">
            Step 1 of 2 · Address &amp; Order Summary
          </span>
        </div>

        {/* main content with equal padding on all sides */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Address form */}
            <section className="flex-[0.6] text-[13px] border border-gray-200 rounded-lg p-4">
              <p className="text-orange-500 font-semibold mb-1">Contact</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter E-mail"
                className="w-full h-9 border border-gray-300 rounded px-3 text-xs mb-3"
              />

              <p className="text-orange-500 font-semibold mb-2">
                Shipping Address
              </p>

              <div className="flex gap-3 mb-3">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  className="flex-1 h-9 border border-gray-300 rounded px-3 text-xs"
                  required
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="flex-1 h-9 border border-gray-300 rounded px-3 text-xs"
                />
              </div>

              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address *"
                className="w-full h-9 border border-gray-300 rounded px-3 text-xs mb-2.5"
                required
              />
              <input
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apartment, Building, Landmark"
                className="w-full h-9 border border-gray-300 rounded px-3 text-xs mb-2.5"
              />

              <div className="flex gap-3 mb-4">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City *"
                  className="flex-1 h-9 border border-gray-300 rounded px-3 text-xs"
                  required
                />
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State *"
                  className="flex-1 h-9 border border-gray-300 rounded px-3 text-xs"
                  required
                />
                <input
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                  className="flex-1 h-9 border border-gray-300 rounded px-3 text-xs"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleBackToCart}
                  className="w-36 h-9 border border-gray-300 text-xs font-semibold rounded text-gray-700 hover:bg-gray-100 transition"
                >
                  ← Back to Cart
                </button>

                <button
                  onClick={handleContinueToPayment}
                  className="flex-1 h-9 bg-orange-500 text-white text-xs font-semibold rounded hover:bg-orange-600 transition"
                >
                  Continue to Payment
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

export default AddAddressPage;
