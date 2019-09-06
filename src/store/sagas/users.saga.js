import { put, takeEvery } from "redux-saga/effects";

import * as actions from "../actions/actions";
import * as api from "../api";

function* fetchUsers(action) {
  const response = yield api.fetchUsers();
  const payload = response.data
    ? Object.keys(response.data).map(item => ({
        email: response.data[item].email,
        id: item,
        role: response.data[item]["role"],
        orgName: response.data[item]["orgName"],
        telefon: response.data[item]["telefon"],
        taxid: response.data[item]["taxid"],
        address: response.data[item]["address"],

      }))
    : [];
  yield put({ type: actions.FETCH_USERS_SUCCESS, payload });
}

function* addUser(action) {
  const response = yield api.addUser(action.payload.email);
  yield put({
    type: actions.ADD_USER_SUCCESS,
    payload: { email: action.email, id: response.data.name }
  });
}

export function* usersWatcher() {
  yield takeEvery(actions.FETCH_USERS, fetchUsers);
  yield takeEvery(actions.ADD_USER, addUser);
}
