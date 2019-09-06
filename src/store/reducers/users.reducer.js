import * as actions from "../actions/actions";

const initialState = {
  users: [],
  loading: false,
  error: null
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_USERS:
      return { ...state, loading: true };
    case actions.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case actions.ADD_USER_SUCCESS:
      return { ...state, users: state.users.concat(action.payload) };
    default:
      return state;
  }
};

export default users;
