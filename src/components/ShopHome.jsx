import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const categories = [
  { id: 1, title: "karate wear", image: "/Adidas karate.jpg", category: "karate-uniform" },
  { id: 2, title: "Upper Wear", image: "/upperwear.jpg", category: "upper-wear" },
  { id: 3, title: "Bottom Wear", image: "/bottomwear.jpg", category: "bottom-wear" },
  { id: 4, title: "GYM", image: "/gym.jpg", category: "gym" },
  { id: 5, title: "Head wear", image: "/headwear.jpg", category: "head-wear" },
  { id: 6, title: "Sports Equipment", image: "/sportsequipment.jpg", category: "sports-equipment" },
];

const recommended = [
  {
    id: 1,
    name: "Shoes",
    price: 30000,
    images: [
      "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    ],
    colors: ["#e98f97ff", "#80888fff", "#2146cbff"],
  },
  {
    id: 2,
    name: "T-Shirt",
    price: 30000,
    images: ["/tshirt-1.jpg", "/tshirt-2.jpg", "/tshirt-3.jpg"],
    colors: ["#6d909bff", "#111827", "#051c5dff"],
  },
  {
    id: 3,
    name: "Head wear",
    price: 30000,
    images: ["/headwear-1.jpg", "/headwear-2.jpg", "/headwear-3.jpg"],
    colors: ["#F97316", "#111827", "#E5E7EB"],
  },
];

const ShopHome = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const handleViewCart = () => navigate("/cart");
  const handleOpenGrid = () => navigate("/shop/products");
  const handleOpenWishlist = () => navigate("/wishlist");

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop/products?category=${categoryId}`);
  };

  const catRowRef = useRef(null);
  const firstCardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(220);

  useEffect(() => {
    if (firstCardRef.current) {
      const rect = firstCardRef.current.getBoundingClientRect();
      setCardWidth(rect.width + 16);
    }
  }, []);

  const scrollCategories = (direction) => {
    if (!catRowRef.current) return;
    const offset = direction === "left" ? -cardWidth : cardWidth;
    catRowRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* hero */}
      <div className="relative">
        <div className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] overflow-hidden">
          <img
            src="/shop.jpg"
            alt="Store"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ✅ ICONS LIKE YOUR SCREENSHOT */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <button
            onClick={handleOpenWishlist}
            className="relative w-12 h-12 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-500 text-xl hover:bg-orange-100 hover:border-orange-300 transition-all duration-200 shadow-sm"
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
            className="relative w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-500 text-2xl hover:bg-orange-100 hover:border-orange-300 transition-all duration-200 shadow-sm"
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

      {/* categories - ONLY TEXT COLOR CHANGE ON HOVER */}
      <section className="w-full px-4 mt-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollCategories("left")}
            className="hidden sm:flex w-8 h-8 rounded-full bg-gray-100 text-gray-600 items-center justify-center shadow hover:bg-orange-400 hover:text-white transition-all duration-200"
          >
            ‹
          </button>

          <div
            ref={catRowRef}
            className="flex gap-4 overflow-x-auto no-scrollbar w-full"
          >
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                ref={idx === 0 ? firstCardRef : null}
                onClick={() => handleCategoryClick(cat.category)}
                className="relative w-52 h-20 rounded-xl overflow-hidden shadow-md bg-black flex-shrink-0 group cursor-pointer"
                title={`Shop ${cat.title}`}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg group-hover:text-orange-400 transition-colors duration-300">
                  {cat.title}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCategories("right")}
            className="hidden sm:flex w-8 h-8 rounded-full bg-gray-100 text-gray-600 items-center justify-center shadow hover:bg-orange-400 hover:text-white transition-all duration-200"
          >
            ›
          </button>
        </div>
      </section>

      {/* Recommended */}
      <section className="max-w-6xl mx-auto px-4 mt-10 mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-6">
          Recommended
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommended.map((item) => (
            <RecommendedCard
              key={item.id}
              item={item}
              onOpenGrid={handleOpenGrid}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const RecommendedCard = ({ item, onOpenGrid }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % item.images.length),
      2000
    );
    return () => clearInterval(timer);
  }, [item.images.length]);

  const slideWidth = 100 / item.images.length;

  return (
    <div className="bg-white rounded-[32px] shadow-md border border-gray-100 overflow-hidden flex flex-col">
      <div className="px-6 pt-6 pb-4">
        <div className="bg-gray-50 rounded-[32px] overflow-hidden relative h-64">
          <div
            className="absolute inset-0 flex"
            style={{
              width: `${item.images.length * 100}%`,
              transform: `translateX(-${index * slideWidth}%)`,
              transition: "transform 0.4s ease",
            }}
          >
            {item.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={item.name}
                className="h-64 object-cover flex-shrink-0"
                style={{ width: `${slideWidth}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          {item.images.map((_, i) => (
            <span
              key={i}
              className={
                "h-1.5 rounded-full transition-all duration-300 " +
                (i === index ? "w-16 bg-orange-500" : "w-10 bg-gray-300")
              }
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 mt-2 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-extrabold text-orange-500">
            {item.name}
          </h3>
          <button
            onClick={onOpenGrid}
            className="h-9 w-9 rounded-full border-2 border-orange-400 text-orange-400 flex items-center justify-center text-xl leading-none hover:bg-orange-50 transition-colors"
          >
            →
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {item.colors.map((c, idx) => (
              <span
                key={idx}
                className="h-5 w-5 rounded-md border border-gray-200"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <p className="text-xl font-bold text-gray-900">
            ₹ {item.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopHome;
