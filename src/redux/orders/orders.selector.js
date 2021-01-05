import { createSelector } from "reselect";
import { sortDesc } from "./orders.utils";

const selectOrders = (state) => state.orders.orders;
const selectCurrentUserOrder = (state) => state.orders.currentUserOrders;
const selectSortOrdersBySelect = (state) => state.orders.select;

export const selectAllOrders = createSelector(
  [selectOrders, selectSortOrdersBySelect],
  (selectOrders, selectSortOrdersBySelect) =>
    sortDesc(selectOrders, selectSortOrdersBySelect)
);

export const selectCurrentUserOrders = createSelector(
  [selectCurrentUserOrder],
  (currentUserOrders) => currentUserOrders
);

export const sortOrdersBySelect = createSelector(
  [selectSortOrdersBySelect],
  (selectSortOrdersBySelect) => selectSortOrdersBySelect
);
