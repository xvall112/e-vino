export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            itemTotalPrice: cartItem.itemTotalPrice + cartItem.price
          }
        : cartItem
    );
  }
  return [
    ...cartItems,
    { ...cartItemToAdd, quantity: 1, itemTotalPrice: cartItemToAdd.price }
  ];
};

export const clearItemFromCart = (cartItems, removeCartItem) => {
  const newCartItems = cartItems.filter(
    cartItem => cartItem.id !== removeCartItem.id
  );

  return newCartItems;
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return clearItemFromCart(cartItems, cartItemToRemove);
  } else {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            itemTotalPrice: cartItem.itemTotalPrice - cartItem.price
          }
        : cartItem
    );
  }
};
