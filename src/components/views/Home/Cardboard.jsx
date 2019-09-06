import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import CardCustom from "../../common/Card/Card";

const Cardboard = props => {
  useEffect(() => {
    props.fetchProducts();
  }, []);
  return (
    <div className="card-board-wrapper">
      {props.products &&
        props.products.map(i => (
          <CardCustom
            id={i.id}
            key={i.id}
            code={i.code}
            price={i.price}
            image={i.images[0]}
            minOrder={i.minOrder}
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch({ type: actions.FETCH_PRODUCTS })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cardboard);
