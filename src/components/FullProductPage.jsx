// src/components/FullProductPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const FullProductPage = ({
  onBack,
  product,
  onAddToCart,
  cartCount = 0,
  onViewCart,
}) => {
  const navigate = useNavigate();
  const { addToWishlist, wishlistCount } = useWishlist();
  
  const [localCartCount, setLocalCartCount] = useState(cartCount);
  const [localWishlistCount, setLocalWishlistCount] = useState(wishlistCount || 0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false); // Toggle state

  useEffect(() => {
    setLocalCartCount(cartCount);
    setLocalWishlistCount(wishlistCount || 0);
  }, [cartCount, wishlistCount]);

  if (!product) return null;

  let price = 0;
  let mrp = 0;
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  let aboutItems = [];

  // 🔥 PRODUCT-WISE DATA (unchanged)
  if (product.id === 202) {
    price = 3000;
    mrp = 3500;
    product.details = {
      "Product Type": "Karate Uniform / Karategi",
      "Available Sizes": "XS, S, M, L, XL, XXL",
      "Brands Available": "Adidas, Arawaza & High-Quality Local Brands",
      "Price": "₹ 3000 (₹500 Discount Applicable)",
      "Suitable For": "Kids to Adults",
      "Usage": "Training, Practice & Competition",
      "Material": "Durable High-Quality Fabric",
      "Comfort": "Soft, Lightweight & Comfortable Fit",
      "Athlete Level": "Beginners to Advanced",
    };
    aboutItems = [
      "Fit Type: Karate Uniform | Suitable for training, practice and competitions",
      "High-quality durable karate fabric designed for long-term use",
      "Comfortable fit with breathable material for better movement",
      "Premium Adidas karate uniform trusted by athletes",
      "Sizes Available: XS, S, M, L, XL, XXL",
    ];
  } else if (product.id === 203) {
    price = 4500;
    mrp = 5000;
    product.details = {
      "Product Type": "Karate Uniform / Karategi",
      "Available Sizes": "XS, S, M, L, XL, XXL",
      "Brands Available": "Adidas, Arawaza & Premium Local Brands",
      "Price": "₹ 4500 (₹500 Discount Applicable)",
      "Suitable For": "Kids, Teens & Adults",
      "Usage": "Training, Practice & Competition",
      "Material": "Durable High-Quality Fabric",
      "Comfort": "Soft, Lightweight & Comfortable Fit",
      "Athlete Level": "Beginners to Advanced",
    };
    aboutItems = [
      "Premium quality karate uniform suitable for kids, teens and adults",
      "Ideal for training, practice and competition",
      "Durable stitching and strong cloth for long-lasting performance",
      "Comfortable and lightweight for smooth movement",
      "Sizes Available: XS, S, M, L, XL, XXL",
    ];
  } else {
    price = 6000;
    mrp = 6000;
    product.details = {
      "Product Type": "WKF Approved Kumite Kit",
      "Brand": "Arawaza",
      "Includes": "Complete Kumite Protection Set",
      "Colors": "Red & Blue",
      "Gloves": "Red & Blue",
      "Body Protector": "Chest Guard",
      "Female Chest Protector": "Available",
      "Shin Guards": "Red / Blue",
      "Foot Protectors": "Red / Blue",
      "Groin Guard": "Men / Boys",
      "Mouth Guard": "Included",
      "Head Guard": "Mandatory for Kids U14",
      "Price": "₹ 6000",
    };
    aboutItems = [
      "WKF Approved Kumite Kit designed for professional use",
      "Includes Gloves, Body Protector, Shin Guards, Foot Guards",
      "Female chest protector available",
      "Head Guard mandatory for kids under 14",
      "Premium Arawaza brand protective kit",
    ];
  }

  const validateSizeSelection = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 3000);
      return false;
    }
    return true;
  };

  const handleBuyNow = () => {
    if (!validateSizeSelection()) return;
    const productToAdd = { ...product, selectedSize, price, mrp };
    onAddToCart(productToAdd);
    navigate("/AddressPage");
  };

  // ✅ LEFT IMAGE WISHLIST: TOGGLE (add/remove) - NO BLINKING
  const handleImageWishlistClick = () => {
    if (productInWishlist) {
      // Remove - decrease count
      setLocalWishlistCount(prev => Math.max(0, prev - 1));
    } else {
      // Add - increase count
      addToWishlist(product);
      setLocalWishlistCount(prev => prev + 1);
    }
    
    setProductInWishlist(!productInWishlist); // Toggle state - NO pulse animation
  };

  // ✅ RIGHT INFO WISHLIST: ONLY NAVIGATE - NO ADD
  const handleInfoWishlistClick = () => {
    navigate("/wishlist");
  };

  const handleAddToCart = () => {
    if (!validateSizeSelection()) return;
    const productToAdd = { ...product, selectedSize, price, mrp };
    onAddToCart(productToAdd);
    setLocalCartCount(prev => prev + 1);
  };

  const getMainImage = (id) => {
    const images = {
      201: "/kumite kit.jpg",
      202: "/Adidas karate.jpg",
      203: "/Aarwaza karate.jpg",
    };
    return images[id] || "/kumite kit.jpg";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT SIDE - LARGER IMAGE WITH OVERLAY WISHLIST */}
      <aside className="flex-1 max-w-[50%] border-r bg-white flex flex-col relative">
        <div className="absolute top-4 left-4 z-20 p-2">
          <button 
            onClick={onBack} 
            className="text-orange-600 font-semibold text-lg flex items-center gap-2 
                         hover:text-orange-700 hover:scale-105 transition-all duration-200 p-2"
          >
            ← Back to Products
          </button>
        </div>

        {/* 🔥 LEFT IMAGE WISHLIST - TOGGLE - NO BLINKING */}
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={handleImageWishlistClick}
            className={`
              w-14 h-14 rounded-full shadow-2xl flex items-center justify-center 
              text-2xl font-bold transition-all duration-300 backdrop-blur-md border-2
              active:scale-95 hover:scale-110
              ${productInWishlist 
                ? 'bg-orange-500 text-white border-orange-500 shadow-lg' 
                : 'bg-white/90 text-orange-500 border-orange-300 hover:bg-orange-50 hover:border-orange-400'
              }
            `}
            title={productInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            ♥
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center pt-24 px-0">
          <img
            src={getMainImage(product.id)}
            alt={product.name}
            className="w-full h-[650px] max-w-full object-contain"
          />
        </div>

        <div className="flex border-t p-4 bg-white">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`
              flex-1 py-3 bg-orange-500 text-white rounded-full 
              font-semibold shadow-sm 
              hover:bg-orange-600 hover:shadow-md hover:-translate-y-0.5
              active:bg-orange-700 active:translate-y-0
              transition-all duration-200 flex items-center justify-center
              ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            🛒 Add to Cart
          </button>
          <div className="w-px bg-gray-200 mx-4" />
          <button
            onClick={handleBuyNow}
            disabled={!selectedSize}
            className={`
              flex-1 py-3 bg-orange-600 text-white rounded-full 
              font-semibold shadow-sm 
              hover:bg-orange-700 hover:shadow-md hover:-translate-y-0.5
              active:bg-orange-800 active:translate-y-0
              transition-all duration-200
              ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            ➤ Buy Now
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <main className="flex-1 max-w-[50%] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 relative">
          <div className="absolute top-8 right-8 flex gap-3 z-10">
            {/* ✅ RIGHT SIDE WISHLIST - ONLY NAVIGATE TO WISHLIST */}
            <div className="relative">
              <button
                onClick={handleInfoWishlistClick}
                className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-full flex items-center justify-center 
                           text-orange-500 text-lg font-bold hover:bg-orange-100 hover:border-orange-400 
                           transition-all duration-150"
                title="View Wishlist"
              >
                ♥
              </button>
              {localWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border border-white">
                  {localWishlistCount}
                </span>
              )}
            </div>

            {/* CART BUTTON */}
            <div className="relative">
              <button
                onClick={onViewCart}
                className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-full text-orange-500 text-xl 
                           hover:bg-orange-100 hover:border-orange-400 transition-all duration-150 flex items-center justify-center"
              >
                🛒
              </button>
              {localCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border border-white">
                  {localCartCount}
                </span>
              )}
            </div>
          </div>

          {/* Rest of content unchanged */}
          <section className="pt-8">
            <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex gap-3 mt-2 items-baseline">
              <span className="text-2xl font-extrabold text-gray-900">
                ₹ {price.toLocaleString("en-IN")}
              </span>
              {mrp > price && (
                <>
                  <span className="text-sm line-through text-gray-400">
                    ₹ {mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                    ₹{mrp - price} OFF
                  </span>
                </>
              )}
            </div>
          </section>

          <section className="border-y py-6">
            <h2 className="text-base font-semibold mb-4 text-gray-900">Select Size</h2>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    w-14 h-14 border-2 rounded-lg flex items-center justify-center text-xs font-medium
                    transition-all duration-200
                    ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-50 scale-105 shadow-md text-orange-700"
                        : "border-gray-300 hover:border-orange-400 hover:bg-orange-50 hover:scale-105"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-xs text-green-600 mt-2 font-medium">
                ✓ Selected Size: <b>{selectedSize}</b>
              </p>
            )}
            {showSizeError && (
              <p className="text-xs text-red-600 mt-2 font-medium animate-pulse">
                ⚠️ Please select a size before adding to cart
              </p>
            )}
          </section>

          <section className="border rounded-xl bg-white shadow-sm p-4">
            <h2 className="text-base font-bold mb-3 text-gray-900">Product details</h2>
            <div className="divide-y divide-gray-200">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 text-xs">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border rounded-xl bg-white shadow-sm p-4">
            <h2 className="text-base font-bold mb-3 text-gray-900">About this item</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
              {aboutItems.map((line, index) => (
                <li key={index} className="leading-relaxed">{line}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FullProductPage;
