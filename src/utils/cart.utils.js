import React from "react";

export const filertItemFromCart = (cartItems, item) => {
  cartItems.filter(cartItem => cartItem.id != item.id);
};

export const getCartItemsCount = cartItems => {
  cartItems.reduce();
};
