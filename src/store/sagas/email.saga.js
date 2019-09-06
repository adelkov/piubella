import * as emailjs from "emailjs-com";
import { takeEvery } from "redux-saga/effects";

import * as actions from "../actions/actions";

function* sendInvite(action) {
  const templateParams = {
    to_name: action.payload.name,
    to_email: action.payload.email
  };

  // yield emailjs.send(
  //   "gmail",
  //   "template_nPx6OhkU",
  //   templateParams,
  //   "user_SyVAs3EGhjT9ecPDkuwKq"
  // );
}

// function* sendOrder(action) {
//   const templateParams = {
//     to_name: action.payload.name,
//     to_email: action.payload.email
//   };

//   emailjs.send(
//     "gmail",
//     "template_nPx6OhkU",
//     templateParams,
//     "user_SyVAs3EGhjT9ecPDkuwKq"
//   );
// }

export function* emailWatcher() {
  yield takeEvery(actions.ADD_USER, sendInvite);
  // yield takeEvery(actions.ORDER, sendOrder);
}
