import { directoryActionTypes } from "./directory.type";

const INITIAL_STATE = {
  wines: [],
  Loading: false
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case directoryActionTypes.UPDATE_DIRECTORY:
      return {
        ...state,
        wines: action.payload
      };
    case directoryActionTypes.SET_LOADING:
      return {
        ...state,
        Loading: action.payload
      };
    default:
      return state;
  }
};
export default directoryReducer;
