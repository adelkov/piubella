import firebase from "firebase";
import { toastr } from "react-redux-toastr";
import { put, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/actions";
import * as api from "../api";

function* login(action) {
  yield firebase
    .auth()
    .signInWithEmailAndPassword(action.fields.email, action.fields.password)
    .catch(error => {
      toastr.error("ERRROR", "Cannot authenticate");
      return;
    });
  const { data } = yield api.getUserByEmail(action.fields.email);
  if (Object.keys(data).length === 0) {
    window.location.hash = "/contact";
  } else if (!data[Object.keys(data)[0]]["id"]) {
    toastr.info("INFO", "register first!");
    yield put({ type: actions.AUTHENTICATE_FAILURE });
  } else {
    window.location.hash = "/home";
    yield put({
      type: actions.AUTHENTICATE_SUCCESS,
      payload: data[Object.keys(data)[0]]
    });
  }
}

function* register(action) {
  const response = yield api.getUserByEmail(action.fields.email);

  if (Object.entries(response.data).length === 0) {
    window.location.hash = "/contact";
  } else {
    const userId = Object.keys(response.data)[0];
    const cartResponse = yield api.addCart(userId);
    yield api.register(userId, {
      email: action.fields.email,
      orgName: action.fields.orgName,
      role: "retailer",
      cart: cartResponse.data.name,
      address: action.fields.address,
      taxid: action.fields.taxid,
      telefon: action.fields.telefon
    });
    const isAuth = yield firebase
      .auth()
      .createUserWithEmailAndPassword(
        action.fields.email,
        action.fields.password
      )
      .catch(error => {
        var errorMessage = error.message;
        toastr.error("ERROR", errorMessage);
        return;
      });
    if (isAuth) {
      yield put({
        type: actions.AUTHENTICATE_SUCCESS,
        payload: {
          email: action.fields.email,
          id: userId,
          orgName: action.fields.orgName,
          role: "retailer",
          cart: cartResponse.data.name,
          address: action.fields.address,
          taxid: action.fields.taxid,
          telefon: action.fields.telefon
        }
      });
    }
  }
}

function* autoAuth(action) {
  const { data } = yield api.getUserByEmail(action.email);
  window.location.hash = "/home";
  yield put({
    type: actions.AUTHENTICATE_SUCCESS,
    payload: data[Object.keys(data)[0]]
  });
}

function* logout(action) {
  yield firebase.auth().signOut();
  yield put({ type: actions.LOGOUT_SUCCESS });
  window.location.hash = "/login";
}

export function* authWatcher() {
  yield takeEvery(actions.LOGIN, login);
  yield takeEvery(actions.REGISTER, register);
  yield takeEvery(actions.LOGOUT, logout);
  yield takeEvery(actions.AUTO_AUTH, autoAuth);
}
