import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

class SignUp extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          orgName: "",
          telefon: "",
          address: "",
          taxid: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object().shape({
          orgName: Yup.string().required("Organization Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          address: Yup.string()
            .required("Address is required"),
          taxid: Yup.string()
            .required("Tax ID is required"),
          telefon: Yup.string()
            .required("Telephone is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Passwords must match")
            .required("Confirm Password is required")
        })}
        onSubmit={fields => {
          this.props.register(fields);
        }}
        render={({ errors, status, touched }) => (
          <Form className="signup-form">
            <FontAwesomeIcon
              icon={faUserCircle}
              size="4x"
              color="#81bdb3"
              className="icon"
            />

            <div className="form-group">
              <label htmlFor="orgName">Organization Name</label>
              <Field
                name="orgName"
                type="text"
                className={
                  "form-control" +
                  (errors.orgName && touched.orgName ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="orgName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefon">Telefon szam</label>
              <Field
                name="telefon"
                type="text"
                className={
                  "form-control" +
                  (errors.telefon && touched.telefon ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="telefon"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Cim</label>
              <Field
                name="address"
                type="text"
                className={
                  "form-control" +
                  (errors.address && touched.address ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="address"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="taxid">Adoszam</label>
              <Field
                name="taxid"
                type="text"
                className={
                  "form-control" +
                  (errors.taxid && touched.taxid ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="taxid"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  "form-control" +
                  (errors.confirmPassword && touched.confirmPassword
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <Buttons />
          </Form>
        )}
      />
    );
  }
}

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Buttons = () => {
  const classes = useStyles();

  return (
    <div className="form-group">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Register
      </Button>
      <Button
        type="reset"
        variant="outlined"
        color="secondary"
        className={classes.button}
      >
        Reset
      </Button>
    </div>
  );
};

export default SignUp;
