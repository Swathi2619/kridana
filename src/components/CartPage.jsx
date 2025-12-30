// src/components/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const IMAGE_MAP = {
  201: "/kumite kit.jpg",
  202: "/Adidas karate.jpg",
  203: "/Aarwaza karate.jpg",
};

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeItem, total, cartCount } = useCart();

  const handleBack = () => navigate("/shop/products");
  const handleCheckout = () => navigate("/AddressPage");

  // EMPTY CART
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col px-6 pt-3 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button className="text-xs text-orange-500 underline" onClick={handleBack}>
            ← Back
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            🛒
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add items to get started</p>
          <button
            onClick={handleBack}
            className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-3 pb-6">
      {/* top bar */}
      <div className="flex items-center justify-between mb-6">
        <button className="text-xs text-orange-500 underline" onClick={handleBack}>
          ← Back
        </button>
      </div>

      {/* cart items */}
      <div className="flex-1 mb-8">
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${item.selectedSize || 'no-size'}-${index}`} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
            {/* IMAGE */}
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden mr-4 flex-shrink-0">
              <img
                src={IMAGE_MAP[item.id] || "/placeholder.jpg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* PRODUCT INFO */}
            <div className="flex-1 min-w-0 pr-8">
              <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                ₹{item.price?.toLocaleString("en-IN") || '0'}
              </p>

              {/* SIZE BADGE + REMOVE - WITH GAP */}
              <div className="flex items-center gap-3 mb-2">
                {item.selectedSize && (
                  <div className="inline-flex items-center bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                   Size :  {item.selectedSize}
                  </div>
                )}
                <button
                  onClick={() => removeItem(item.id, item.selectedSize)}
                  className="text-xs text-red-500 underline hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* QTY */}
            <div className="flex items-center gap-2 mr-6 flex-shrink-0">
              <button
                onClick={() => updateQty(item.id, item.qty - 1, item.selectedSize)}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={item.qty <= 1}
              >
                -
              </button>
              <span className="text-sm font-bold min-w-[24px] text-center">
                {item.qty}
              </span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1, item.selectedSize)}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>

            {/* PRICE - NO REMOVE BUTTON */}
            <div className="text-right font-bold text-sm text-gray-900 min-w-[70px]">
              ₹{(item.price * item.qty).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ FOOTER - BUTTON EXACTLY MIDDLE OF TOTAL & PRICE */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-gray-700">
            Total ({cartCount} items)
          </span>
          <span className="text-lg font-bold text-gray-900">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCheckout}
            className="px-20 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm w-full max-w-sm"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
