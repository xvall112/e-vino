import { loadingActionTypes } from "./loading.types";

const initialState = {
  loading: false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case loadingActionTypes.LOADING_START:
      return { ...state, loading: true };
    case loadingActionTypes.LOADING_END:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default loadingReducer;
