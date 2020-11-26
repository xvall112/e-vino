import { combineReducers } from "redux";
/* import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; */

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import ordersReducer from "./orders/orders.reducer";
import loadingReducer from "./loading/loading.reducer";

/* const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
}; */

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  directory: directoryReducer,
  orders: ordersReducer,
  loading: loadingReducer
});

export default /* persistReducer(persistConfig,  */ rootReducer /* ) */;
