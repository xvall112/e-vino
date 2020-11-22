import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  hiddenCart: true,
  handleToggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0
});

const CartProvider = ({ children }) => {
  const [hiddenCart, setHiddenCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addItem = item => setCartItems(addItemToCart(cartItems, item));
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = item =>
    setCartItems(filterItemFromCart(cartItems, item));
  const handleToggleHidden = () => setHiddenCart(!hiddenCart);

  return (
    <CartContext.Provider
      value={{
        hiddenCart,
        cartItems,
        cartItemsCount,
        addItem,
        handleToggleHidden,
        removeItem,
        clearItemFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
