import React, { createContext, useContext, useState, useMemo } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    if (!product?.id) return;
    setWishlistItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const normalized = {
        id: product.id,
        name: product.name,
        price: product.price ?? 0,
        image:
          product.image ||
          product.images?.[0] ||
          "/placeholder-product.png",
      };
      return [...prev, normalized];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearWishlist = () => setWishlistItems([]);

  const value = useMemo(
    () => ({
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      wishlistCount: wishlistItems.length,
    }),
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
