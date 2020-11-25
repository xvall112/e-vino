import { userActionTypes } from "./user.type";

export const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = user => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const emailSignInStart = emailAndPassword => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = () => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = emailPasswordName => ({
  type: userActionTypes.SIGN_UP_START,
  payload: emailPasswordName
});

export const signUpSuccess = user => ({
  user: userActionTypes.SIGN_UP_SUCCESS,
  payload
});

export const signUpFailure = error => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error
});
