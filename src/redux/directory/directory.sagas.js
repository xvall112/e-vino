import { takeLatest, call, put } from "redux-saga/effects";
import { directoryActionTypes } from "./directory.type";
import {
  firestore,
  convertWinesSnapshotToMap
} from "../../firebase/firebase.utils";
import { fetchWinesSuccess, fetchWinesFailure } from "./directory.actions";

export function* fetchWinesAsync() {
  try {
    const winesRef = firestore.collection("wines");
    const snapshot = yield winesRef.get();
    const winesMap = yield call(convertWinesSnapshotToMap, snapshot);
    yield put(fetchWinesSuccess(winesMap));
  } catch (error) {
    yield put(fetchWinesFailure(error.message));
  }
}

export function* fetchWinesStart() {
  yield takeLatest(
    directoryActionTypes.FETCH_COLLECTIONS_START,
    fetchWinesAsync
  );
}
