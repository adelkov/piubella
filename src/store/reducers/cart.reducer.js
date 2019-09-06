import * as actions from "../actions/actions";

const initialState = {
  cart: [],
  total: 0
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_CART_SUCCESS:
      const total = action.cart.reduce((acc, product) => {
        return acc + product.price * product.quant;
      }, 0);
      return { cart: action.cart, total };
    case actions.UPDATE_CART_SUCCESS:
      return {
        total: action.cart.reduce((acc, product) => {
          return acc + product.price * product.quant;
        }, 0),
        cart: action.cart
      };
    default:
      return state;
  }
};

export default cart;
