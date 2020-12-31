import { takeLatest, put, all, call } from "redux-saga/effects";

import { ordersActionTypes } from "./orders.type";
import {
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchCurrentUserOrdersSuccess,
  fetchCurrentUserOrdersFailure,
} from "../orders/orders.action";
import {
  firestore,
  convertCollectionAllOrdersToMap,
  convertCollectionAllCurrentUserOrdersToMap,
} from "../../firebase/firebase.utils";
import { loadingStart, loadingEnd } from "../loading/loading.actions";

export function* fetchOrdersAsync() {
  try {
    yield put(loadingStart());
    const ordersRef = firestore.collection("orders");
    const snapshot = yield ordersRef.get();
    const ordersMap = yield call(convertCollectionAllOrdersToMap, snapshot);
    yield put(fetchOrdersSuccess(ordersMap));
    yield put(loadingEnd());
  } catch (error) {
    yield put(fetchOrdersFailure(error.message));
    yield put(loadingEnd());
  }
}

export function* fetchCurrentUserOrdersAsync({ payload }) {
  try {
    yield put(loadingStart());
    const userRef = firestore.collection("users").doc(payload);
    const userOrdersSnapshot = yield userRef.get();
    yield put(fetchCurrentUserOrdersSuccess(userOrdersSnapshot.data().orders));
    yield put(loadingEnd());
  } catch (error) {
    yield put(fetchCurrentUserOrdersFailure(error.message));
    yield put(loadingEnd());
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(ordersActionTypes.FETCH_ORDERS_START, fetchOrdersAsync);
}

export function* onFetchCurrentUserOrdersStart() {
  yield takeLatest(
    ordersActionTypes.FETCH_CURRENT_USER_ORDERS_START,
    fetchCurrentUserOrdersAsync
  );
}

export function* ordersSagas() {
  yield all([call(onFetchOrdersStart), call(onFetchCurrentUserOrdersStart)]);
}
