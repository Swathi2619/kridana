// src/contexts/CartContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const { id, selectedSize } = action.payload;
      const sizeKey = `${id}-${selectedSize || 'no-size'}`;
      
      // Check if item with same id + size already exists
      const existing = state.find(item => 
        `${item.id}-${item.selectedSize || 'no-size'}` === sizeKey
      );
      
      if (existing) {
        return state.map(item =>
          `${item.id}-${item.selectedSize || 'no-size'}` === sizeKey
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    
    case 'UPDATE_QTY':
      const { id: updateId, qty: newQty, selectedSize: updateSize } = action.payload;
      const updateSizeKey = `${updateId}-${updateSize || 'no-size'}`;
      
      if (newQty <= 0) {
        // Remove all items with this id + size
        return state.filter(item => 
          `${item.id}-${item.selectedSize || 'no-size'}` !== updateSizeKey
        );
      }
      
      return state.map(item => {
        const itemKey = `${item.id}-${item.selectedSize || 'no-size'}`;
        return itemKey === updateSizeKey
          ? { ...item, qty: newQty }
          : item;
      });
    
    case 'REMOVE_ITEM':
      const { id: removeId, selectedSize: removeSize } = action.payload;
      const removeSizeKey = `${removeId}-${removeSize || 'no-size'}`;
      return state.filter(item => 
        `${item.id}-${item.selectedSize || 'no-size'}` !== removeSizeKey
      );
    
    case 'CLEAR_CART':
      return [];
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const updateQty = (id, qty, selectedSize) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty, selectedSize } });
  };

  const removeItem = (id, selectedSize) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, selectedSize } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);
  const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 0)), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      cartCount,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
