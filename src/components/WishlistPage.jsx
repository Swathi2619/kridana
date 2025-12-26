// src/components/WishlistPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const goToProducts = () => navigate("/shop/products");
  const handleGoToCart = () => navigate("/cart");

  const handleAddToCart = (item) => {
    addToCart(item); // add to cart context
    handleGoToCart(); // optional: go to cart after adding
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            Wishlist ({wishlistItems.length})
          </h1>
          <button
            onClick={goToProducts}
            className="text-xs font-semibold text-orange-500 hover:text-orange-600"
          >
            ← Back to Products
          </button>
        </div>

        <div className="p-6">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm text-gray-500 mb-4">
                Your wishlist is empty. Add items you love and find them here later.
              </p>
              <button
                onClick={goToProducts}
                className="px-5 h-9 rounded-full bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm font-bold text-orange-500">
                        ₹ {item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="h-8 px-3 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="h-8 px-4 rounded-full bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
