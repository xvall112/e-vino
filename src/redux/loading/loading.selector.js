import { createSelector } from "reselect";

const selectLoading = state => state.loading;

export const selectLoad = createSelector(
  [selectLoading],
  loading => loading.loading
);
