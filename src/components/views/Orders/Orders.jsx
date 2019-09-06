import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { default as React, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import OrdersPanel from "./OrdersPanel";

const useStylesPaper = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    margin: "auto"
  }
}));

export const Orders = props => {
  const classes = useStylesPaper();

  useEffect(() => {
    props.loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper className={classes.root}>
      <OrdersPanel orders={props.orders} />
    </Paper>
  );
};

const mapStateToProps = state => ({
  orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  loadOrders: () => dispatch({ type: actions.GET_ORDERS })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
