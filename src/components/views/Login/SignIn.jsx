import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

class SignIn extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required")
        })}
        onSubmit={fields => {
          this.props.login(fields);
        }}
        render={({ errors, status, touched }) => (
          <Form className="signup-form">
            <FontAwesomeIcon
              icon={faKey}
              size="4x"
              color="#81bdb3"
              className="icon"
            />

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
        Login
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

export { SignIn };
