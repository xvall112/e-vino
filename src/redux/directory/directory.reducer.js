import { directoryActionTypes } from "./directory.type";

const INITIAL_STATE = {
  wines: [],
  isFetching: false,
  errorMessage: undefined
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case directoryActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case directoryActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        wines: action.payload
      };
    case directoryActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case directoryActionTypes.UPDATE_DIRECTORY:
      return {
        ...state,
        wines: action.payload
      };

    default:
      return state;
  }
};
export default directoryReducer;
