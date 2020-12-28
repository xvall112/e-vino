import { takeLatest, call, put, all } from "redux-saga/effects";
import { directoryActionTypes } from "./directory.type";
import {
  firestore,
  convertWinesSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchWinesSuccess,
  fetchWinesFailure,
  deleteWinesFailure,
  deleteWinesSuccess
} from "./directory.actions";
import { loadingStart, loadingEnd } from "../loading/loading.actions";

import { notistackSuccess, notistackError } from "../../notistack/notistack";

export function* fetchWinesAsync() {
  try {
    yield put(loadingStart());
    const winesRef = firestore.collection("wines");
    const snapshot = yield winesRef.get();
    const winesMap = yield call(convertWinesSnapshotToMap, snapshot);
    yield put(fetchWinesSuccess(winesMap));
    yield put(loadingEnd());
  } catch (error) {
    yield put(fetchWinesFailure(error.message));
    yield put(loadingEnd());
  }
}

export function* deleteWines({ payload }) {
  try {
    yield put(loadingStart());
    yield firestore
      .collection("wines")
      .doc(payload)
      .delete();
    yield put(deleteWinesSuccess());
    yield put(loadingEnd());
    yield call(notistackSuccess, "Odstraněno");
  } catch (error) {
    yield put(deleteWinesFailure(error.message));
    yield put(loadingEnd());
    yield call(notistackError, "Něco se pokazilo, zkuzte znovu");
  }
}

export function* onFetchWinesStart() {
  yield takeLatest(
    directoryActionTypes.FETCH_COLLECTIONS_START,
    fetchWinesAsync
  );
}
export function* onDeleteWinesStart() {
  yield takeLatest(directoryActionTypes.DELETE_WINES_START, deleteWines);
}

export function* directorySagas() {
  yield all([call(onFetchWinesStart), call(onDeleteWinesStart)]);
}
