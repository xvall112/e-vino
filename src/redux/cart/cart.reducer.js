import { cartActionTypes } from "./cart.type";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: false,
  cartItems: [],
  error: null
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOOGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload)
      };
    case cartActionTypes.ADD_ORDER_FAILURE:
      return { ...state, error: action.payload };

    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case cartActionTypes.ADD_ORDER_SUCCESS:
    case cartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };
    default:
      return state;
  }
};
export default cartReducer;
