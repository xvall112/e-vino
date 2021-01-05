import { createSelector } from "reselect";
import { sortDesc, filterAllOrdersBySearch } from "./orders.utils";

const selectOrders = (state) => state.orders.orders;
const selectCurrentUserOrder = (state) => state.orders.currentUserOrders;
const selectSortOrdersBySelect = (state) => state.orders.select;
const selectFilterAllOrdersBySearch = (state) => state.orders.search;

export const selectAllOrdersFilterBySearch = createSelector(
  [selectOrders, selectFilterAllOrdersBySearch],
  (selectOrders, selectFilterAllOrdersBySearch) => {
    if (selectFilterAllOrdersBySearch === "") return selectOrders;
    else
      return filterAllOrdersBySearch(
        selectOrders,
        selectFilterAllOrdersBySearch
      );
  }
);

export const selectSortOrders = createSelector(
  [selectAllOrdersFilterBySearch, selectSortOrdersBySelect],
  (selectAllOrdersFilterBySearch, selectSortOrdersBySelect) =>
    sortDesc(selectAllOrdersFilterBySearch, selectSortOrdersBySelect)
);

export const selectAllOrders = createSelector(
  [selectSortOrders],
  (selectSortOrders) => selectSortOrders
);

export const selectCurrentUserOrders = createSelector(
  [selectCurrentUserOrder],
  (currentUserOrders) => currentUserOrders
);

export const sortOrdersBySelect = createSelector(
  [selectSortOrdersBySelect],
  (selectSortOrdersBySelect) => selectSortOrdersBySelect
);
