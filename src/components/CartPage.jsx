// src/components/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeItem, total, cartCount } = useCart();

  const handleBack = () => {
    navigate("/shop/products");
  };

  const handleCheckout = () => {
    navigate("/AddressPage");
  };

  // EMPTY CART
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col px-6 pt-3 pb-6">
        {/* top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="text-xs text-orange-500 underline"
          >
            ← Back
          </button>
        </div>

        {/* empty message */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            🛒
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
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

  // CART WITH ITEMS
  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-3 pb-6">
      {/* top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          className="text-xs text-orange-500 underline"
        >
          ← Back
        </button>
      </div>

      {/* cart items */}
      <div className="flex-1">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border-b border-gray-200 py-4"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-xs text-gray-500 mr-4">
              {item.name.slice(0, 2)}
            </div>

            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500">
                ₹ {item.price.toLocaleString("en-IN")}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="mt-1 text-xs text-red-500 underline"
              >
                Remove
              </button>
            </div>

            <div className="flex items-center gap-3 mr-6">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="w-4 text-center text-sm">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>

            <div className="w-24 text-right font-semibold text-sm">
              ₹ {(item.price * item.qty).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm font-semibold">
            Total ({cartCount} items)
          </span>

          <button
            onClick={handleCheckout}
            className="px-10 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition mx-auto"
          >
            Proceed to Pay
          </button>

          <span className="text-sm font-semibold">
            ₹ {total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
