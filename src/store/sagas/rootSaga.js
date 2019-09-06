import { all } from "redux-saga/effects";

import { authWatcher } from "./authenticate.saga";
import { cartWatcher } from "./cart.saga";
import { emailWatcher } from "./email.saga";
import { productsWatcher } from "./products.saga";
import { usersWatcher } from "./users.saga";

export default function* rootSaga() {
  yield all([
    productsWatcher(),
    authWatcher(),
    usersWatcher(),
    cartWatcher(),
    emailWatcher()
  ]);
}
