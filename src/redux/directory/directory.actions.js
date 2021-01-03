import { directoryActionTypes } from "./directory.type";

export const fetchWinesSuccess = (collectionsMap) => ({
  type: directoryActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchWinesStart = () => ({
  type: directoryActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchWinesFailure = (ErrorMessage) => ({
  type: directoryActionsTypes.FETCH_COLLECTIONS_FAILURE,
  payload: ErrorMessage,
});

export const deleteWinesStart = (id) => ({
  type: directoryActionTypes.DELETE_WINES_START,
  payload: id,
});

export const deleteWinesSuccess = () => ({
  type: directoryActionTypes.DELETE_WINES_SUCCESS,
});

export const deleteWinesFailure = (ErrorMessage) => ({
  type: directoryActionTypes.DELETE_WINES_FAILURE,
  payload: ErrorMessage,
});

export const addWinesStart = (addWine) => ({
  type: directoryActionTypes.ADD_WINES_START,
  payload: addWine,
});

export const addWinesSuccess = () => ({
  type: directoryActionTypes.ADD_WINES_SUCCESS,
});

export const addWinesFailure = (ErrorMessage) => ({
  type: directoryActionTypes.ADD_WINES_FAILURE,
  payload: ErrorMessage,
});

export const updateWinesStart = (updateWine) => ({
  type: directoryActionTypes.UPDATE_WINES_START,
  payload: updateWine,
});

export const updateWinesSuccess = () => ({
  type: directoryActionTypes.UPDATE_WINES_SUCCESS,
});

export const updateWinesFailure = (ErrorMessage) => ({
  type: directoryActionTypes.UPDATE_WINES_FAILURE,
  payload: ErrorMessage,
});

export const setFilteringWinesColor = (winesColor) => ({
  type: directoryActionTypes.SET_FILTERING_WINES_COLOR,
  payload: winesColor,
});

export const setFilteringWinesDruh = (winesDruh) => ({
  type: directoryActionTypes.SET_FILTERING_WINES_DRUH,
  payload: winesDruh,
});

export const clearFilteringWines = () => ({
  type: directoryActionTypes.CLEAR_FILTERING_WINES,
});
