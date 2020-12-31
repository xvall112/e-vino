import { ordersActionTypes } from "./orders.type";

const initialState = {
  currentUserOrders: [],
  orders: [],
  errorMessage: undefined,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersActionTypes.FETCH_ORDERS_START:
      return { ...state, isFetching: true };
    case ordersActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case ordersActionTypes.FETCH_CURRENT_USER_ORDERS_SUCCESS:
      return {
        ...state,
        currentUserOrders: action.payload,
      };
    case ordersActionTypes.FETCH_CURRENT_USER_ORDERS_FAILURE:
    case ordersActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default ordersReducer;
