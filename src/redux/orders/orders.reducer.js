import { ordersActionTypes } from "./orders.type";
import { sortDesc } from "./orders.utils";

const initialState = {
  currentUserOrders: [],
  orders: [],
  errorMessage: undefined,
  select: "date",
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: sortDesc(action.payload, "date"),
      };
    case ordersActionTypes.FETCH_CURRENT_USER_ORDERS_SUCCESS:
      return {
        ...state,
        currentUserOrders: sortDesc(action.payload, "date"),
      };
    case ordersActionTypes.FETCH_CURRENT_USER_ORDERS_FAILURE:
    case ordersActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case ordersActionTypes.SORT_ALL_ORDERS_BY_SELECT:
      return {
        ...state,
        select: action.payload,
      };
    default:
      return state;
  }
};
export default ordersReducer;
