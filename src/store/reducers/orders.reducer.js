import * as actions from "../actions/actions";

const initialState = {
  orders: [],
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ORDERS_SUCCESS:
        return {orders: action.orders}
    default:
      return state;
  }
};

export default orders;
