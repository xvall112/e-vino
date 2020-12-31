import { userActionTypes } from "./user.type";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
    case userActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
