import { toastr } from "react-redux-toastr";
import { put, takeEvery } from "redux-saga/effects";

import * as actions from "../actions/actions";
import * as api from "../api";

function* addToCart(action) {
  const { data } = yield api.getCart(action.payload.cartId);
  let myCart = data.cart || [];
  let index = getIndexByProperty(myCart, "code", action.payload.code);
  if (index !== -1) {
    myCart[index]["quant"] += action.payload.quant;
  } else {
    const { data } = yield api.getProductByCode(action.payload.code);
    myCart.push({ ...data[Object.keys(data)[0]], quant: action.payload.quant });
  }
  yield api.updateCart(action.payload.cartId, myCart || []);
  toastr.success("Success", "Item added to Cart");
  yield put({ type: actions.UPDATE_CART_SUCCESS, cart: myCart || [] });
}

function* loadCart(action) {
  const { data } = yield api.getCart(action.id);
  const cart = data.cart;
  yield put({ type: actions.LOAD_CART_SUCCESS, cart: cart || [] });
}

function* deleteFromCart(action) {
  const cart = action.payload.cart.filter(
    item => item.code !== action.payload.code
  );
  yield api.updateCart(action.payload.cartId, cart);
  toastr.success("SUCCESS", "item deleted from cart");
  yield put({ type: actions.UPDATE_CART_SUCCESS, cart });
}

function* orderCart(action) {
  yield api.order(action.payload.email, {
    cart: action.payload.cart,
    timestamp: Date()
  });
  yield api.updateCart(action.payload.cartId, []);
  toastr.success("SUCCESS", "order sent");
  yield put({ type: actions.UPDATE_CART_SUCCESS, cart: [] });
}

function* getOrders(action) {
  const { data } = yield api.getOrders();
  const orders =
    data &&
    Object.keys(data).map(key => ({
      id: key,
      cart: data[key].cart,
      email: data[key].email
    }));
  yield put({ type: actions.GET_ORDERS_SUCCESS, orders });
}

export function* cartWatcher() {
  yield takeEvery(actions.ADD_TO_CART, addToCart);
  yield takeEvery(actions.LOAD_CART, loadCart);
  yield takeEvery(actions.DELETE_FROM_CART, deleteFromCart);
  yield takeEvery(actions.ORDER, orderCart);
  yield takeEvery(actions.GET_ORDERS, getOrders);
}

function getIndexByProperty(data, key, value) {
  for (var i = 0; i < data.length; i++) {
    if (data[i][key] === value) {
      return i;
    }
  }
  return -1;
}
