import { cartActionTypes } from "./cart.type";

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOOGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: cartActionTypes.ADD_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const removeItem = item => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearCart = () => ({
  type: cartActionTypes.CLEAR_CART
});

export const addOrderStart = order => ({
  type: cartActionTypes.ADD_ORDER_START,
  payload: order
});

export const addOrderSuccess = () => ({
  type: cartActionTypes.ADD_ORDER_SUCCESS
});

export const addOrderFailure = error => ({
  type: cartActionTypes.ADD_ORDER_FAILURE,
  payload: error
});
