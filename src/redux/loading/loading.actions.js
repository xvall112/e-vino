import { loadingActionTypes } from "./loading.types";

export const loadingStart = () => ({
  type: loadingActionTypes.LOADING_START
});

export const loadingEnd = () => ({
  type: loadingActionTypes.LOADING_END
});
