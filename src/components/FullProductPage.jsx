import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";

const FullProductPage = ({
  onBack,
  product,
  onAddToCart,
  cartCount = 0,
  onViewCart,
}) => {
  const navigate = useNavigate();
  const { addToWishlist, wishlistCount } = useWishlist();

  if (!product) return null;

  const price = product.price ?? 0;
  const mrp = Math.round(price * 1.2);

  const handleBuyNow = () => {
    navigate("/AddressPage");
  };

  const handleWishlistClick = () => {
    addToWishlist(product);
    navigate("/wishlist");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT */}
      <aside className="flex-1 max-w-[50%] border-r border-gray-200 bg-white flex flex-col">
        {/* thumbnails + main image */}
        <div className="flex-1 flex">
          <div className="w-20 border-r border-gray-100 flex flex-col items-center gap-3 py-6 bg-gray-50">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="w-14 h-20 rounded-md border border-gray-200 bg-white flex items-center justify-center text-[10px] text-gray-400 hover:border-pink-500 transition"
              >
                img
              </button>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-sm aspect-[3/4] bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center">
              <span className="text-6xl text-gray-300">📦</span>
            </div>
          </div>
        </div>

        {/* bottom buttons */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 py-3 bg-white text-orange-600 font-semibold flex items-center justify-center gap-2 hover:bg-pink-50 transition text-sm"
          >
            🛒 Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 bg-orange-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-pink-700 transition text-sm"
          >
            ➤ Buy Now
          </button>
        </div>
      </aside>

      {/* RIGHT */}
      <main className="flex-1 max-w-[50%] flex flex-col">
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <button
            onClick={onBack}
            className="text-xs text-orange-600 font-semibold flex items-center gap-1 hover:underline"
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            {/* wishlist icon with count */}
            <button
              onClick={handleWishlistClick}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs relative hover:bg-gray-200"
            >
              ♥
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onViewCart}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs relative hover:bg-gray-200"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* content (unchanged) */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <section className="space-y-3 mb-6">
            <h1 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h1>
            <p className="text-sm text-gray-600">
              {product.description ||
                "High-quality sports product designed for comfort and performance."}
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                ⭐ 3.8
              </span>
              <span className="text-xs text-gray-500">
                21,875 Ratings · 8,723 Reviews
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₹ {price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹ {mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  20% off
                </span>
              </div>
              <p className="text-xs text-gray-500">Free Delivery</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-5 pb-6">
            <h2 className="text-sm font-semibold mb-3">Select Size</h2>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="w-12 h-12 rounded-full border border-gray-300 text-xs flex flex-col items-center justify-center hover:border-pink-500 hover:text-pink-600 transition bg-white"
                >
                  <span>{size}</span>
                  <span className="text-[10px] text-gray-500">
                    ₹ {price.toLocaleString("en-IN")}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="border-t border-gray-200 pt-5 pb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Product Highlights</h2>
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <p className="text-gray-400">Color</p>
                <p className="text-gray-800">Black</p>
              </div>
              <div>
                <p className="text-gray-400">Fabric</p>
                <p className="text-gray-800">Polyester</p>
              </div>
              <div>
                <p className="text-gray-400">Fit / Shape</p>
                <p className="text-gray-800">Regular</p>
              </div>
              <div>
                <p className="text-gray-400">Length</p>
                <p className="text-gray-800">Calf-length</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FullProductPage;
