import React from "react";
import { connect } from "react-redux";

import { Loader } from "../../common/Loader/Loader";
import SingleLineGridList from "./SingleLineGridList";

const Home = props => {
  if (props.isAuth) {
    return <SingleLineGridList />;
  }

  if (props.loading) {
    return <Loader />;
  }
  window.location.hash = "/login";
  return <div />;
};

const mapStateToProps = state => ({
  email: state.auth.email,
  isAuth: state.auth.isAuth,
  loading: state.products.loading
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
