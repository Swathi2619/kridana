// src/components/FullProductPage.jsx
import React from "react";

const FullProductPage = ({ onBack, product, onAddToCart, cartCount = 0, onViewCart }) => {
  if (!product) return null; // safety

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
            <button 
              onClick={onViewCart}
              className="w-8 h-8 rounded-full bg-gray-100 text-xs flex items-center justify-center relative group hover:bg-orange-100 transition"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Product content area */}
        <div className="flex-1 flex bg-white">
          {/* Left product image area */}
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="w-full max-w-md h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-4xl text-gray-500">📦</span>
            </div>
          </div>

          {/* Right product info + Add button */}
          <div className="w-80 p-8 flex flex-col gap-6 bg-white border-l border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                <span>⭐</span>
                <span>4.8 (120 reviews)</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description || "High-quality sports product with premium materials. Perfect for your training sessions."}
            </p>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₹ {product.price?.toLocaleString("en-IN") || "0"}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹ {(product.price * 1.2)?.toLocaleString("en-IN") || "0"}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  20% off
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => onAddToCart(product)}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                ⊕ Add to Cart
              </button>

              {/* Quick actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                  🛒 Buy Now
                </button>
                <button className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl hover:bg-gray-200 transition">
                  ♥
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FullProductPage;
