import { directoryActionTypes } from "./directory.type";

export const fetchWinesSuccess = collectionsMap => ({
  type: directoryActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchWinesStart = () => ({
  type: directoryActionTypes.FETCH_COLLECTIONS_START
});

export const fetchWinesFailure = ErrorMessage => ({
  type: directoryActionsTypes.FETCH_COLLECTIONS_FAILURE,
  payload: ErrorMessage
});

export const deleteWinesStart = id => ({
  type: directoryActionTypes.DELETE_WINES_START,
  payload: id
});

export const deleteWinesSuccess = () => ({
  type: directoryActionTypes.DELETE_WINES_SUCCESS
});

export const deleteWinesFailure = ErrorMessage => ({
  type: directoryActionTypes.DELETE_WINES_FAILURE,
  payload: ErrorMessage
});

export const addWinesStart = addWine => ({
  type: directoryActionTypes.ADD_WINES_START,
  payload: addWine
});

export const addWinesSuccess = () => ({
  type: directoryActionTypes.ADD_WINES_SUCCESS
});

export const addWinesFailure = ErrorMessage => ({
  type: directoryActionTypes.ADD_WINES_FAILURE,
  payload: ErrorMessage
});
