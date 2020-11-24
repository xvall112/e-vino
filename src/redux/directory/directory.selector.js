import { createSelector } from "reselect";

const selectDirectory = state => state.directory;

export const selectDirectoryWine = createSelector(
  [selectDirectory],
  directory => directory.wines
);

export const selectIsWinesFetching = createSelector(
  [selectDirectory],
  directory => directory.isFetching
);
