import * as actions from "../actions/actions";



const products = (state = {products: []}, action) => {
  switch (action.type) {
    case actions.FETCH_PRODUCTS:
      return { ...state, loading: true };
    case actions.FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      }
    case actions.ADD_PRODUCT_SUCCESS:
      return {...state, products: [...state.products, action.payload], loading: false}
    default:
      return state;
  }
};

export default products;
