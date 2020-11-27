import { takeLatest, put, all, call } from "redux-saga/effects";

import { userActionTypes } from "./user.type";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils";

import { notistackSuccess, notistackError } from "../../notistack/notistack";

import { loadingStart, loadingEnd } from "../loading/loading.actions";

export function* getSnapshotFromUserAuth(userAuth, addData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, addData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    yield call(notistackSuccess, "Jste Přihlášen");
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  yield put(loadingEnd());
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
    yield call(notistackError, "Něco se pokazilo, zkuzte znovu");
    yield put(loadingEnd());
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  yield put(loadingStart());
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
    yield call(notistackError, "Uživatelské jméno nebo heslo nesouhlasí");
    yield put(loadingEnd());
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  yield put(loadingStart());
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield put(loadingEnd());
    yield call(notistackSuccess, "Jste Odhlášen");
  } catch (error) {
    yield put(signOutFailure(error));
    yield put(loadingEnd());
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  yield put(loadingStart());
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield put(
      signUpSuccess({
        user,
        additionalData: { displayName }
      })
    );
    yield put(loadingEnd());
  } catch (error) {
    yield put(signUpFailure(error));
    yield call(notistackError, "Pro tento email už existuje účet");
    yield put(loadingEnd());
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignIn() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignIn),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
