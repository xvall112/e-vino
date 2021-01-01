import { createSelector } from "reselect";

const selectDirectory = (state) => state.directory.wines;
const selectDirectoryWinesColor = (state) => state.directory.colorWines;
const selectDirectoryWinesDruh = (state) => state.directory.druhWines;

export const selectColorWine = createSelector(
  [selectDirectoryWinesColor],
  (colorWines) => colorWines
);

export const selectDruhWine = createSelector(
  [selectDirectoryWinesDruh],
  (druhWines) => druhWines
);

export const filterColorWine = createSelector(
  [selectDirectory, selectDirectoryWinesColor],
  (wines, colorWines) =>
    colorWines === ""
      ? wines
      : wines.filter((wine) => wine.color === colorWines)
);

export const filterDruhWine = createSelector(
  [filterColorWine, selectDirectoryWinesDruh],
  (colorWines, druhWines) =>
    druhWines === ""
      ? colorWines
      : colorWines.filter((wine) => wine.druh === druhWines)
);

export const selectDirectoryWine = createSelector(
  [filterDruhWine],
  (wines) => wines
);
