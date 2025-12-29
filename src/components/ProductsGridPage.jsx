import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import FullProductPage from "./FullProductPage";

const products = [
  {
    id: 201,
    name: "WKF Kumite Kit",
    price: 6000,
    originalPrice: 6000,
    description:
      "🥋 WKF Approved Kumite Kit (Arawaza). Includes kumite gloves (mitts) in red and blue, body protector (chest guard), female chest protector (for women), shin guards in red and blue, foot protectors in red and blue, groin guard (men/boys), mouth guard (gum shield), and head guard/helmet (mandatory for kids under 14).",
  },
  {
    id: 202,
    name: "Karate Uniform (Adidas)",
    price: 3000, // Original 3000 - ₹500 discount
    originalPrice: 3500,
    discount: "₹500 OFF",
    description:
      "Wide range of karate uniforms (karategi) from kids to adults. Adidas uniform with durable fabric and comfortable fitting, suitable for training, practice, and competition, for beginners to advanced athletes.",
  },
  {
    id: 203,
    name: "Karate Uniform (Aarwaza)",
    price: 4500, // Original 4500 - ₹500 discount
    originalPrice: 5000,
    discount: "₹500 OFF",
    description:
      "Karate uniforms (karategi) from Adidas, Aarwaza, and high-quality local brands. All sizes available from kids to adults, durable fabric, comfortable fit, for training, practice, and competition.",
  },
];

const PRICE_RANGES = [
  { id: "10-100", label: "10 – 100", min: 10, max: 100 },
  { id: "100-1000", label: "100 – 1000", min: 100, max: 1000 },
  { id: "1000-10000", label: "1000 – 10,000", min: 1000, max: 10000 },
];

const IMAGE_MAP = {
  201: 'kumite kit.jpg',
  202: 'Adidas karate.jpg',
  203: 'Aarwaza karate.jpg'
};

const ProductsGridPage = () => {
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, wishlistCount } =
    useWishlist();

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [view, setView] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBack = () => navigate("/shop");
  const handleViewCart = () => navigate("/cart");
  const handleViewWishlist = () => navigate("/wishlist");

  const togglePriceRange = (id) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
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

  const filteredProducts = products.filter((p) => {
    if (selectedPriceRanges.length === 0) return true;

    const price = p.price;
    const inAnyRange = PRICE_RANGES.some((range) => {
      if (!selectedPriceRanges.includes(range.id)) return false;
      return price >= range.min && price <= range.max;
    });

    return inAnyRange;
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
      {/* YOUR ORIGINAL SIDEBAR - UNCHANGED */}
      <aside className="w-72 bg-orange-100 p-6 space-y-6">
        <button
          onClick={handleBack}
          className="mb-4 text-sm text-orange-600 underline"
        >
          ← Back
        </button>

        <div>
          <h2 className="text-3xl font-extrabold text-orange-600 mb-4">
            Category
          </h2>
          <div className="space-y-3 text-lg">
            <div>Sale 50% off</div>
            <div>Men's</div>
            <div>Woman's</div>
            <div>Basket</div>
            <div>Sports ware</div>
          </div>
        </div>

        <div>
          <h3 className="mt-6 text-2xl font-extrabold text-orange-600">
            Filter By :
          </h3>
          <p className="mt-2 font-semibold">Price</p>

          <div className="mt-2 space-y-2 text-sm">
            {PRICE_RANGES.map((range) => (
              <label
                key={range.id}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-orange-500"
                  checked={selectedPriceRanges.includes(range.id)}
                  onChange={() => togglePriceRange(range.id)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-extrabold text-orange-600 mb-3">
            Colors
          </h3>
          <div className="flex gap-2">
            <span className="w-8 h-8 bg-black rounded-full cursor-pointer hover:scale-110 transition-transform" />
            <span className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer hover:scale-110 transition-transform" />
            <span className="w-8 h-8 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform" />
            <span className="w-8 h-8 bg-lime-500 rounded-full cursor-pointer hover:scale-110 transition-transform" />
            <span className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer hover:scale-110 transition-transform" />
            <span className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* Header WITHOUT Search */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Karate Gear</h1>
            <p className="text-xl text-gray-600 font-semibold">Premium Quality Equipment</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleViewWishlist}
              className="relative p-4 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100"
            >
              <span className="text-2xl text-orange-500 block">♥</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white text-xs rounded-2xl flex items-center justify-center font-bold shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleViewCart}
              className="relative p-4 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100"
            >
              <span className="text-2xl text-orange-500 block">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white text-xs rounded-2xl flex items-center justify-center font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const liked = isLiked(product.id);
            const imageSrc = IMAGE_MAP[product.id];
            
            return (
              <div
                key={product.id}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-orange-100/50 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] h-[380px] flex flex-col hover:border-orange-200"
              >
                {/* Image */}
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-white via-orange-50/50 to-white">
                  <img
                    src={`/${imageSrc}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                    onClick={() => openFullProduct(product)}
                  />
                  
                  {/* Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      liked ? removeFromWishlist(product.id) : addToWishlist(product);
                    }}
                    className={`absolute top-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center text-lg shadow-xl z-10 backdrop-blur-md transition-all ${
                      liked
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/40"
                        : "bg-white shadow-white/60 text-orange-500 border-2 border-white/50 hover:bg-orange-50/90 hover:border-orange-200"
                    } hover:scale-110 hover:shadow-2xl`}
                  >
                    ♥
                  </button>
                  
                  {/* ₹500 OFF Badge for Karate Dresses ONLY */}
                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border-2 border-white/30">
                      {product.discount}
                    </div>
                  )}
                  
                  {/* Regular discount for WKF */}
                  
                </div>

                {/* Content - UPDATED PRICES */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-lg text-gray-900 mb-3 line-clamp-1 leading-tight tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 backdrop-blur-sm">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900 tracking-tight">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-gray-400 line-through font-medium">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all backdrop-blur-sm border border-orange-400/30 flex items-center justify-center gap-2"
                    >
                      <span>🛒</span>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center mb-8 shadow-xl border-4 border-white">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3 tracking-tight">No Products Found</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">Try adjusting your price filters above</p>
              <button 
                onClick={() => setSelectedPriceRanges([])}
                className="px-10 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 backdrop-blur-sm border border-orange-400/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductsGridPage;
