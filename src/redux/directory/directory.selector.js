import { createSelector } from "reselect";

const selectDirectory = state => state.directory;

export const selectDirectoryWine = createSelector(
  [selectDirectory],
  directory => directory.wine
);
