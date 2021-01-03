import { directoryActionTypes } from "./directory.type";

const INITIAL_STATE = {
  wines: [],
  colorWines: "",
  druhWines: "",
  errorMessage: undefined,
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case directoryActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
      };
    case directoryActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,

        wines: action.payload,
      };
    case directoryActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,

        errorMessage: action.payload,
      };
    case directoryActionTypes.UPDATE_DIRECTORY:
      return {
        ...state,
        wines: action.payload,
      };
    case directoryActionTypes.SET_FILTERING_WINES_COLOR:
      return {
        ...state,
        colorWines: action.payload,
      };
    case directoryActionTypes.SET_FILTERING_WINES_DRUH:
      return {
        ...state,
        druhWines: action.payload,
      };
    case directoryActionTypes.CLEAR_FILTERING_WINES:
      return {
        ...state,
        druhWines: "",
        colorWines: "",
      };
    default:
      return state;
  }
};
export default directoryReducer;
