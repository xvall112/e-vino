import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUserMessage = createSelector(
  [selectUser],
  user => user.message
);

export const selectUserVariant = createSelector(
  [selectUser],
  user => user.variant
);
