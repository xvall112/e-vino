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
