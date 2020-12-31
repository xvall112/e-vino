import { takeLatest, call, put, all } from "redux-saga/effects";
import { directoryActionTypes } from "./directory.type";
import {
  firestore,
  convertWinesSnapshotToMap,
  addWines,
  updateWines
} from "../../firebase/firebase.utils";
import {
  fetchWinesSuccess,
  fetchWinesFailure,
  deleteWinesFailure,
  deleteWinesSuccess,
  addWinesFailure,
  addWinesSuccess,
  updateWinesSuccess,
  updateWinesFailure,
  fetchWinesStart
} from "./directory.actions";
import { loadingStart, loadingEnd } from "../loading/loading.actions";

import { selectImageWine } from "../../utils/wine.utils";

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
    yield put(fetchWinesStart());
    yield call(notistackSuccess, "Odstraněno");
  } catch (error) {
    yield put(deleteWinesFailure(error.message));
    yield put(loadingEnd());
    yield call(notistackError, "Něco se pokazilo, zkuzte znovu");
  }
}

export function* addWine({ payload: { values } }) {
  try {
    yield put(loadingStart());
    const image = yield call(selectImageWine, values.color);
    yield call(addWines, { image, values });
    yield put(addWinesSuccess());
    yield put(loadingEnd());
    yield put(fetchWinesStart());
    yield call(notistackSuccess, "Přidáno");
  } catch (error) {
    yield put(addWinesFailure(error.message));
    yield put(loadingEnd());
    yield call(notistackError, "Něco se pokazilo, zkuzte znovu");
  }
}

export function* updateWine({ payload: { values, id } }) {
  try {
    yield put(loadingStart());
    const image = yield call(selectImageWine, values.color);
    yield call(updateWines, { image, values, id });
    yield put(updateWinesSuccess());
    yield put(loadingEnd());
    yield put(fetchWinesStart());
    yield call(notistackSuccess, "Upraveno");
  } catch (error) {
    yield put(updateWinesFailure(error.message));
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

export function* onAddWinesStart() {
  yield takeLatest(directoryActionTypes.ADD_WINES_START, addWine);
}

export function* onUpdateWinesStart() {
  yield takeLatest(directoryActionTypes.UPDATE_WINES_START, updateWine);
}

export function* directorySagas() {
  yield all([
    call(onFetchWinesStart),
    call(onDeleteWinesStart),
    call(onAddWinesStart),
    call(onUpdateWinesStart)
  ]);
}
