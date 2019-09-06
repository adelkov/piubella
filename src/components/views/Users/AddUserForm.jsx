import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const stylePaper = theme => ({
  root: {
    padding: "30px",
    marginTop: "2%",
    width: "50%"
  }
});
class AddUserForm extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Formik
        initialValues={{
          email: "",
          name: ""
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          name: Yup.string().required("Name required")
        })}
        onSubmit={fields => {
          this.props.addUser(fields.email, fields.name);
        }}
        render={({ errors, status, touched }) => (
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Kereskedo meghivas
            </Typography>
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>

                <Field
                  name="name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="name"
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
                <Button type="submit" color="secondary" variant="contained">
                  Invite user
                </Button>
                <Button type="reset" color="primary" variant="outlined">
                  Reset
                </Button>
              </div>
            </Form>
          </Paper>
        )}
      />
    );
  }
}

export default withStyles(stylePaper)(AddUserForm);
