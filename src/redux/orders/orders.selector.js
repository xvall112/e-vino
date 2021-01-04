import { createSelector } from "reselect";

const selectOrders = (state) => state.orders.orders;
const selectCurrentUserOrder = (state) => state.orders.currentUserOrders;

export const selectAllOrders = createSelector(
  [selectOrders],
  (selectOrders) => selectOrders
);

export const selectCurrentUserOrders = createSelector(
  [selectCurrentUserOrder],
  (currentUserOrders) => currentUserOrders
);
