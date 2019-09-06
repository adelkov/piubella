import { Button } from "@material-ui/core";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";

import * as actions from "../../../store/actions/actions";

const OrderForm = props => (
  <div>
    <Formik
      initialValues={{ quant: 0 }}
      validationSchema={Yup.object().shape({
        quant: Yup.number().min(
          props.minOrder,
          `Minimum rendeles ${props.minOrder}`
        )
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.addToCart(values.quant, props.code, props.cartId);
          setSubmitting(false);
          props.handleClose();
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Field
            type="number"
            name="quant"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.quant}
            className={
              "form-control" +
              (errors.quant && touched.quant ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="quant"
            component="div"
            className="invalid-feedback"
          />
          <Button
            style={{ marginTop: "4%" }}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            Kosarba tesz
          </Button>
        </form>
      )}
    </Formik>
  </div>
);

const mapStateToProps = state => ({
  cartId: state.auth.cart
});

const mapDispatchToProps = dispatch => ({
  addToCart: (quant, code, cartId) =>
    dispatch({ type: actions.ADD_TO_CART, payload: { quant, code, cartId } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm);
