import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

class AddClothes extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          images: [""],
          minOrder: 0,
          price: 0,
          code: ""
        }}
        validationSchema={Yup.object().shape({
          images: Yup.array().of(
            Yup.string()
              .url("Image should be provided in URL format.")
              .required("Image is required")
          ),
          minOrder: Yup.number()
            .required("Minimum order required")
            .min(10),
          price: Yup.number().required("Price required"),
          code: Yup.string().required("Code required")
        })}
        onSubmit={fields => {
          this.props.addProduct(fields);
          this.props.handleClose();
        }}
        render={({ errors, touched, values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="code">Code</label>
              <Field
                name="code"
                type="text"
                className={
                  "form-control" +
                  (errors.code && touched.code ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="code"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="minOrder">Minimum order</label>
              <Field
                name="minOrder"
                type="number"
                className={
                  "form-control" +
                  (errors.minOrder && touched.minOrder ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="minOrder"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (Ft)</label>
              <Field
                name="price"
                type="number"
                className={
                  "form-control" +
                  (errors.price && touched.price ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Images (url)</label>

              <FieldArray
                name="images"
                render={arrayHelpers => (
                  <div>
                    {values.images &&
                      values.images.length > 0 &&
                      values.images.map((image, index) => (
                        <div key={index}>
                          <Field
                            type="string"
                            name={`images.${index}`}
                            className={
                              "form-control" +
                              (errors.images && touched.images
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="images"
                            component="div"
                            className="invalid-feedback"
                          />
                          <Button
                            size="small"
                            onClick={() => arrayHelpers.insert(index, "")}
                            color="primary"
                            aria-label="add"
                          >
                            <AddIcon />
                          </Button>
                          <Button
                            size="small"
                            onClick={() => arrayHelpers.remove(index)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      ))}
                    <ErrorMessage
                      name="images"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                )}
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
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Feltoltes
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

export default AddClothes;
