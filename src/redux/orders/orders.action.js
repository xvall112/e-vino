import { ordersActionTypes } from "./orders.type";

export const fetchOrdersSuccess = (ordersMap) => ({
  type: ordersActionTypes.FETCH_ORDERS_SUCCESS,
  payload: ordersMap,
});

export const fetchOrdersStart = () => ({
  type: ordersActionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersFailure = (ErrorMessage) => ({
  type: ordersActionTypes.FETCH_ORDERS_FAILURE,
  payload: ErrorMessage,
});

export const fetchCurrentUserOrdersSuccess = (currentUserOrdersMap) => ({
  type: ordersActionTypes.FETCH_CURRENT_USER_ORDERS_SUCCESS,
  payload: currentUserOrdersMap,
});

export const fetchCurrentUserOrdersStart = (currentUserId) => ({
  type: ordersActionTypes.FETCH_CURRENT_USER_ORDERS_START,
  payload: currentUserId,
});

export const fetchCurrentUserOrdersFailure = (ErrorMessage) => ({
  type: ordersActionTypes.FETCH_CURRENT_USER_ORDERS_FAILURE,
  payload: ErrorMessage,
});
