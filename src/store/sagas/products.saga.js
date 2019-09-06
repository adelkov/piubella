import { put, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/actions";
import * as api from "../api";

function* fetchProducts(action) {
  const response = yield api.fetchProducts();
  const payload =
    response.data &&
    Object.keys(response.data).map(item => ({
      code: response.data[item].code,
      minOrder: response.data[item].minOrder,
      price: response.data[item].price,
      images: response.data[item].images,
      id: item
    }));

  yield put({ type: actions.FETCH_PRODUCTS_SUCCESS, payload });
}

function* addProduct(action) {
  const id = yield api.addProduct(action.payload);
  const payload = { ...action.payload, id };
  yield put({ type: actions.ADD_PRODUCT_SUCCESS, payload });
}

function* deleteProduct(action) {
  yield api.deleteProduct(action.payload);
  yield put({ type: actions.DELETE_PRODUCT_SUCCESS, payload: action.payload });
}

export function* productsWatcher() {
  yield takeEvery(actions.FETCH_PRODUCTS, fetchProducts);
  yield takeEvery(actions.ADD_PRODUCT, addProduct);
  yield takeEvery(actions.DELETE_PRODUCT, deleteProduct);
}
