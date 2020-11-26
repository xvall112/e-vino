import { takeLatest, put, all, call } from "redux-saga/effects";

import { ordersActionTypes } from "./orders.type";
import {
  fetchOrdersSuccess,
  fetchOrdersFailure
} from "../orders/orders.action";
import {
  firestore,
  convertCollectionAllOrdersToMap
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

export function* onFetchOrdersStart() {
  yield takeLatest(ordersActionTypes.FETCH_ORDERS_START, fetchOrdersAsync);
}

export function* ordersSagas() {
  yield all([call(onFetchOrdersStart)]);
}
