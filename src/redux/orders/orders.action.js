import { ordersActionTypes } from "./orders.type";

export const fetchOrdersSuccess = ordersMap => ({
  type: ordersActionTypes.FETCH_ORDERS_SUCCESS,
  payload: ordersMap
});

export const fetchOrdersStart = () => ({
  type: ordersActionTypes.FETCH_ORDERS_START
});

export const fetchOrdersFailure = ErrorMessage => ({
  type: ordersActionTypes.FETCH_ORDERS_FAILURE,
  payload: ErrorMessage
});
