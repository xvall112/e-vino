import { all, call, takeLatest, put } from "redux-saga/effects";

import { cartActionTypes } from "./cart.type";
import { userActionTypes } from "../user/user.type";
import { clearCart, addOrderSuccess, addOrderFailure } from "./cart.action";

import { addOrderToFirestore } from "../../firebase/firebase.utils";

import { notistackSuccess } from "../../notistack/notistack";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* addOrder(payload) {
  try {
    yield call(addOrderToFirestore, payload);
    yield put(addOrderSuccess());
    yield call(notistackSuccess, "Objednávka proběhla úspěšně");
  } catch (error) {
    yield put(addOrderFailure(error));
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onAddOrderStart() {
  yield takeLatest(cartActionTypes.ADD_ORDER_START, addOrder);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onAddOrderStart)]);
}
