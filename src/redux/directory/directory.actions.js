import { directoryActionTypes } from "./directory.type";

export const updateDirectory = collectionsMap => ({
  type: directoryActionTypes.UPDATE_DIRECTORY,
  payload: collectionsMap
});

export const setLoading = bool => ({
  type: directoryActionTypes.SET_LOADING,
  payload: bool
});
