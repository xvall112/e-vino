import { takeLatest, call, put } from "redux-saga/effects";
import { directoryActionTypes } from "./directory.type";
import {
  firestore,
  convertWinesSnapshotToMap
} from "../../firebase/firebase.utils";
import { fetchWinesSuccess, fetchWinesFailure } from "./directory.actions";
import { loadingStart, loadingEnd } from "../loading/loading.actions";

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

export function* fetchWinesStart() {
  yield takeLatest(
    directoryActionTypes.FETCH_COLLECTIONS_START,
    fetchWinesAsync
  );
}
