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

  // Image mapping for public folder root
  const getMainImage = (id) => {
    const images = {
      201: '/kumite kit.jpg',
      202: '/Adidas karate.jpg',
      203: '/Aarwaza karate.jpg'
    };
    return images[id] || '/kumite kit.jpg';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT - Main Image Only */}
      <aside className="flex-1 max-w-[50%] border-r border-gray-200 bg-white flex flex-col">
        {/* Main Image - LIGHT ZOOM EFFECT */}
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="w-full max-w-md h-[500px] border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden relative bg-gray-100 group">
            <img 
              src={getMainImage(product.id)}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 ease-in-out"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50/90 to-white text-6xl text-gray-400 hidden">
              🥋
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex border-t border-gray-200 p-4 bg-white">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 py-3 px-6 bg-orange-500 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-orange-600 hover:shadow-xl transition-all text-sm shadow-lg hover:scale-[1.02]"
          >
            🛒 Add to Cart
          </button>
          <div className="w-px bg-gray-200 mx-4" />
          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 px-6 bg-orange-600 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:bg-orange-700 hover:shadow-xl transition-all text-sm shadow-lg hover:scale-[1.02]"
          >
            ➤ Buy Now
          </button>
        </div>
      </aside>

      {/* RIGHT - Product Details */}
      <main className="flex-1 max-w-[50%] flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-8 py-6 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-sm text-orange-600 font-semibold flex items-center gap-1 hover:underline transition-colors hover:scale-[1.02]"
            >
              ← Back to Products
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleWishlistClick}
                className="relative w-11 h-11 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-500 text-xl hover:bg-orange-100 transition-all hover:scale-[1.05]"
              >
                ♥
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onViewCart}
                className="relative w-11 h-11 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-500 text-xl hover:bg-orange-100 transition-all hover:scale-[1.05]"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
          {/* Product Title & Description */}
          <section className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900">
                  ₹ {price.toLocaleString("en-IN")}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹ {mrp.toLocaleString("en-IN")}
                </span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((mrp - price) / mrp) * 100)}% off
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">Free Delivery</p>
            </div>

            {/* Product Description */}
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
              {product.description}
            </p>
          </section>

          {/* Size Selection */}
          <section className="border-y border-gray-200 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Size</h2>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="w-16 h-16 rounded-xl border-2 border-gray-200 text-sm font-medium flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 hover:scale-[1.05] transition-all bg-white shadow-sm hover:shadow-md"
                >
                  {size}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FullProductPage;
