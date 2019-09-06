import * as actions from "../actions/actions";

const initialState = {
  loading: false,
  isAuth: false,
  email: "",
  orgName: "",
  role: "",
  cart: ''
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        loading: true
      }
    case actions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        orgName: action.payload.orgName,
        isAuth: true,
        role: action.payload.role,
        cart: action.payload.cart,
        loading: false
      };

    case actions.LOGOUT_SUCCESS:
      return { ...state, email: "", isAuth: false, role: '', orgName: '', loading: false };
    default:
      return state;
  }
};

export default auth;
