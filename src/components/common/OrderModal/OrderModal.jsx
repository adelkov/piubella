import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import OrderForm from "./OrderForm";

const OrderModal = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {props.product.code}
      </DialogTitle>
      <DialogContent>
        <Typography>Mennyiseg:</Typography>
        <OrderForm
          handleClose={props.handleClose}
          code={props.product.code}
          minOrder={props.product.minOrder}
        />
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addToCart: payload => dispatch({ type: actions.ADD_TO_CART, payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderModal);
