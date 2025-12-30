// src/components/WishlistPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const IMAGE_MAP = {
  201: "/kumite kit.jpg",
  202: "/Adidas karate.jpg",
  203: "/Aarwaza karate.jpg",
};

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const goToProducts = () => navigate("/shop/products");
  const handleGoToCart = () => navigate("/cart");

  const handleAddToCart = (item) => {
    addToCart(item);
    handleGoToCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button - Top of Page, Small Text */}
        <div className="mb-12">
          <button
            onClick={goToProducts}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors p-1"
          >
            ← Back to Products
          </button>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Wishlist ({wishlistItems.length})
          </h1>
        </div>

        {/* Body */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l-1.5 4.5M17 13l1.5 4.5M17 13l4-8M16 15a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <p className="text-lg text-gray-500 mb-6">
              Your wishlist is empty. Add items you love and find them here later.
            </p>
            <button
              onClick={goToProducts}
              className="px-8 py-3 rounded-full bg-orange-500 text-white font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col"
              >
                {/* Smaller Image */}
                <div className="h-32 bg-gray-100 overflow-hidden">
                  <img
                    src={IMAGE_MAP[item.id] || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Smaller Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  <div className="mb-3">
                    <p className="text-base font-bold text-orange-500">
                      ₹ {item.price?.toLocaleString("en-IN")}
                    </p>
                    {item.mrp && item.mrp > item.price && (
                      <p className="text-xs text-gray-400 line-through">
                        ₹ {item.mrp.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 mt-auto">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2 bg-orange-500 text-white rounded-lg font-semibold text-xs hover:bg-orange-600 transition-colors shadow-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full py-2 border-2 border-gray-200 text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping CTA */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={goToProducts}
              className="px-8 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold text-lg hover:bg-gray-200 transition-colors"
            >
              ← Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
