// src/components/ProductsGridPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import FullProductPage from "./FullProductPage";

const products = [
  { id: 101, name: "Running Shoes", price: 2999, description: "Lightweight running shoes" },
  { id: 102, name: "Training Shoes", price: 3499, description: "Gym training shoes" },
  { id: 103, name: "Sports T-Shirt", price: 999, description: "Dry-fit sports t-shirt" },
  { id: 104, name: "Track Pants", price: 1499, description: "Stretchable track pants" },
  { id: 105, name: "Gym Bag", price: 1899, description: "Spacious gym bag" },
  { id: 106, name: "Head Band", price: 299, description: "Sports head band" },
  { id: 107, name: "Cricket Bat", price: 3999, description: "Willow cricket bat" },
  { id: 108, name: "Football", price: 1299, description: "Professional football" },
];

const PRICE_RANGES = [
  { id: "10-100", label: "10 – 100", min: 10, max: 100 },
  { id: "100-1000", label: "100 – 1000", min: 100, max: 1000 },
  { id: "1000-10000", label: "1000 – 10,000", min: 1000, max: 10000 },
];

const ProductsGridPage = () => {
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, wishlistCount } =
    useWishlist();

  const [search, setSearch] = useState("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [view, setView] = useState("grid"); // "grid" | "full"
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

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter((p) => {
    const name = p.name.toLowerCase();
    const desc = (p.description || "").toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      name.includes(normalizedSearch) ||
      desc.includes(normalizedSearch);

    if (selectedPriceRanges.length === 0) return matchesSearch;

    const price = p.price;
    const inAnyRange = PRICE_RANGES.some((range) => {
      if (!selectedPriceRanges.includes(range.id)) return false;
      return price >= range.min && price <= range.max;
    });

    return matchesSearch && inAnyRange;
  });

  const isLiked = (id) => wishlistItems.some((p) => p.id === id);

  // ---------- FULL PRODUCT VIEW ----------
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

  // ---------- GRID VIEW ----------
  return (
    <div className="min-h-screen bg-white flex">
      {/* left sidebar */}
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
            <div>Men’s</div>
            <div>Woman’s</div>
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
            <span className="w-8 h-8 bg-black" />
            <span className="w-8 h-8 bg-orange-500" />
            <span className="w-8 h-8 bg-red-500" />
            <span className="w-8 h-8 bg-lime-500" />
            <span className="w-8 h-8 bg-blue-500" />
            <span className="w-8 h-8 bg-purple-500" />
          </div>
        </div>
      </aside>

      {/* right content */}
      <main className="flex-1 p-6">
        {/* top row */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
            <span className="mr-2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
          </div>

          {/* wishlist icon – uses global count and goes to wishlist page */}
          <button
            onClick={handleViewWishlist}
            className="relative w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl"
          >
            ♥
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={handleViewCart}
            className="relative w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* NOTE: old "Liked Products" strip removed completely */}

        {/* products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const liked = isLiked(product.id);
            return (
              <div
                key={product.id}
                className="border border-orange-200 rounded-3xl overflow-hidden bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-full text-left">
                  {/* IMAGE AREA – CLICK TO OPEN FULL PRODUCT */}
                  <div
                    className="relative bg-gray-100 h-40 cursor-pointer"
                    onClick={() => openFullProduct(product)}
                  >
                    {/* heart uses global wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        liked
                          ? removeFromWishlist(product.id)
                          : addToWishlist(product);
                      }}
                      className={
                        "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm " +
                        (liked
                          ? "bg-orange-500 text-white"
                          : "bg-white text-orange-500")
                      }
                    >
                      ♥
                    </button>
                  </div>

                  <div className="w-full text-left">
                    <div className="p-3">
                      <h4 className="font-semibold text-lg mb-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="font-semibold">
                            ₹ {product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center justify-center gap-1 hover:bg-orange-600 transition-colors"
                  >
                    ⊕ Add to Cart
                  </button>
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-sm text-gray-500 mt-8">
              No products match “{search}”.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductsGridPage;
