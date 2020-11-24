import { all, call } from "redux-saga/effects";

import { fetchWinesStart } from "./directory/directory.sagas";
import { cartSagas } from "./cart/cart.saga";
import { userSagas } from "./user/user.saga";

export default function* rootSaga() {
  yield all([call(fetchWinesStart), call(userSagas), call(cartSagas)]);
}
