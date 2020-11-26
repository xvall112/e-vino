import { createSelector } from "reselect";

const selectOrders = state => state.orders;

export const selectAllOrders = createSelector(
  [selectOrders],
  orders => orders.orders
);
