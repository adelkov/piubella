import axios from "axios";
import * as urls from "../constants/urls";

export const fetchProducts = () => axios.get(urls.products + ".json");

export const addProduct = payload =>
  axios({
    method: "POST",
    url: urls.products + ".json",
    data: payload
  });

export const deleteProduct = payload =>
  axios({
    method: "DELETE",
    url: urls.products + "/" + payload + ".json"
  });

export const addUser = email =>
  axios({
    method: "POST",
    url: urls.users + ".json",
    data: {
      email
    }
  });

export const fetchUsers = () => axios.get(urls.users + ".json");

export const getUserByEmail = email =>
  axios({
    method: "GET",
    url: `${urls.users}.json?orderBy="email"&equalTo="${email}"`
  });

export const register = (id, data) =>
  axios({
    method: "PUT",
    url: urls.users + "/" + id + ".json",
    data: { ...data, id }
  });

export const addCart = userId =>
  axios({
    method: "POST",
    url: urls.carts + ".json",
    data: { userId }
  });

export const updateCart = (id, cart) =>
  axios({
    method: "PATCH",
    url: urls.carts + "/" + id + ".json",
    data: { cart }
  });

export const getCart = id =>
  axios({
    method: "GET",
    url: urls.carts + "/" + id + ".json"
  });

export const getCarts = () =>
  axios({
    method: "GET",
    urls: urls.carts + ".json"
  });

export const getProductByCode = code =>
  axios({
    method: "GET",
    url: `${urls.products}.json?orderBy="code"&equalTo="${code}"`
  });

export const order = (email, cart) =>
  axios({
    method: "POST",
    url: urls.orders + ".json",
    data: {
      email,
      cart
    }
  });

  export const getOrders = () =>
  axios({
    method: "GET",
    url: urls.orders + ".json"
  });