import { all, call } from "redux-saga/effects";

import { directorySagas } from "./directory/directory.sagas";
import { cartSagas } from "./cart/cart.saga";
import { userSagas } from "./user/user.saga";
import { ordersSagas } from "./orders/orders.saga";

export default function* rootSaga() {
  yield all([
    call(directorySagas),
    call(userSagas),
    call(cartSagas),
    call(ordersSagas)
  ]);
}
