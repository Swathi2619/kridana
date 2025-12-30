import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import FullProductPage from "./FullProductPage";

const products = [
  {
    id: 201,
    name: "WKF Kumite Kit",
    price: 6000,
    originalPrice: 6000,
    category: "Kumite Kit",
    colors: ["blue", "red"], // Multiple colors for Kumite Kit
  },
  {
    id: 202,
    name: "Karate Uniform (Adidas)",
    price: 3500,
    originalPrice: 4000,
    discount: "₹500 OFF",
    category: "Karate Uniform",
    color: "white",
  },
  {
    id: 203,
    name: "Karate Uniform (Aarwaza)",
    price: 6500,
    originalPrice: 7000,
    discount: "₹500 OFF",
    category: "Karate Uniform",
    color: "white",
  },
];

const CATEGORIES = [
  { id: "karate-uniform", label: "Karate Uniform" },
  { id: "kumite-kit", label: "Kumite Kit" },
];

const PRICE_RANGES = [
  { id: "1000-5000", label: "₹1,000 – ₹5,000", min: 1000, max: 5000 },
  { id: "5000-10000", label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
];

const COLORS = [
  { id: "white", label: "White" },
  { id: "blue", label: "Blue" },
  { id: "red", label: "Red" }, // Added Red color
];

const IMAGE_MAP = {
  201: "kumite kit.jpg",
  202: "Adidas karate.jpg",
  203: "Aarwaza karate.jpg",
};

const ProductsGridPage = () => {
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, wishlistCount } =
    useWishlist();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [view, setView] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBack = () => navigate("/shop");
  const handleViewCart = () => navigate("/cart");
  const handleViewWishlist = () => navigate("/wishlist");

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const togglePriceRange = (id) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const openFullProduct = (product) => {
    setSelectedProduct(product);
    setView("full");
  };

  const handleBackFromFull = () => {
    setView("grid");
    setSelectedProduct(null);
  };

  // Updated filter logic to handle multiple colors per product
  const filteredProducts = products.filter((p) => {
    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(
        p.category.toLowerCase().replace(/\s+/g, "-")
      )
    ) {
      return false;
    }

    // Price filter
    if (selectedPriceRanges.length > 0) {
      const inPriceRange = PRICE_RANGES.some(
        (range) =>
          selectedPriceRanges.includes(range.id) &&
          p.price >= range.min &&
          p.price <= range.max
      );
      if (!inPriceRange) return false;
    }

    // Color filter - handles both single color and multiple colors
    if (selectedColors.length > 0) {
      const productColors = p.colors || [p.color]; // Support both formats
      const hasMatchingColor = selectedColors.some((selectedColor) =>
        productColors.includes(selectedColor)
      );
      if (!hasMatchingColor) return false;
    }

    return true;
  });

  const isLiked = (id) => wishlistItems.some((p) => p.id === id);

  if (view === "full" && selectedProduct) {
    return (
      <FullProductPage
        onBack={handleBackFromFull}
        product={selectedProduct}
        onAddToCart={addToCart}
        cartCount={cartCount}
        onViewCart={handleViewCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-72 bg-orange-100 p-4 space-y-3 overflow-y-auto">
        <div className="w-full pb-2 border-b border-orange-200">
          <button
            onClick={handleBack}
            className="text-sm text-orange-600 underline hover:text-orange-700 transition w-full text-left py-1"
          >
            ← Back
          </button>
        </div>

        <div>
          <h2 className="text-lg font-bold text-orange-600 mb-2">Categories</h2>
          <div className="space-y-1">
            {CATEGORIES.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-orange-500 rounded"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
                <span className="font-medium text-gray-900 text-sm">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-orange-600 mb-2">
            Filter By Price
          </h3>
          <div className="space-y-1">
            {PRICE_RANGES.map((range) => (
              <label
                key={range.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-orange-500 rounded"
                  checked={selectedPriceRanges.includes(range.id)}
                  onChange={() => togglePriceRange(range.id)}
                />
                <span className="font-medium text-gray-900 text-sm">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-orange-600 mb-2">Colors</h3>

          <div className="space-y-1">
            {COLORS.map((color) => (
              <label
                key={color.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-orange-50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-orange-500 rounded"
                  checked={selectedColors.includes(color.id)}
                  onChange={() => toggleColor(color.id)}
                />

                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor:
                        color.id === "white"
                          ? "#f8fafc"
                          : color.id === "blue"
                          ? "#2563eb"
                          : color.id === "red"
                          ? "#dc2626"
                          : "#fff",
                    }}
                  ></div>

                  <span className="font-medium text-gray-900 text-sm capitalize">
                    {color.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {(selectedCategories.length > 0 ||
          selectedPriceRanges.length > 0 ||
          selectedColors.length > 0) && (
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedPriceRanges([]);
              setSelectedColors([]);
            }}
            className="w-full bg-orange-500 text-white py-2 px-3 rounded font-semibold hover:bg-orange-600 transition text-sm"
          >
            Clear All Filters
          </button>
        )}
      </aside>

      {/* ---------------- MAIN PRODUCTS ---------------- */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Karate wear
            </h1>
            <p className="text-xl text-gray-600 font-semibold">
              Premium Quality Equipment
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleViewWishlist}
              className="relative w-12 h-12 bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-100 hover:border-orange-300 transition-all duration-200 shadow-sm"
            >
              ♥
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={handleViewCart}
              className="relative w-12 h-12 bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-100 hover:border-orange-300 transition-all duration-200 shadow-sm"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const liked = isLiked(product.id);
            const imageSrc = IMAGE_MAP[product.id];

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-orange-100 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] h-[280px] flex flex-col hover:border-orange-200 cursor-pointer"
                onClick={() => openFullProduct(product)}
              >
                <div className="h-44 relative overflow-hidden flex-1">
                  <img
                    src={`/${imageSrc}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      liked
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product);
                    }}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center text-base shadow-xl z-10 ${
                      liked
                        ? "bg-orange-600 text-white"
                        : "bg-white text-orange-500 hover:bg-orange-50"
                    } transition-colors`}
                  >
                    ♥
                  </button>

                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.discount}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-base text-gray-900 leading-tight mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-xl font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    {product.originalPrice && product.id !== 201 && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ProductsGridPage;
