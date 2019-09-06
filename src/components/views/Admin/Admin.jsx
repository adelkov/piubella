import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { default as React, useEffect } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import AddClothes from "./AddClothes";

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const modalStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(modalStyles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Admin = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Ruhak</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>kep</th>
            <th>#</th>
            <th>Kod</th>
            <th>Min rendeles</th>

            <th />
          </tr>
        </thead>
        <tbody>
          {props.products &&
            props.products.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.images} height="60px" alt={item.code} />
                </td>
                <td>1</td>
                <td>{item.code}</td>
                <td>{item.minOrder}</td>
                <td onClick={() => props.deleteProduct(item.id)}>
                  <Button color="secondary" variant="contained">
                    Torles
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            fullWidth
          >
            Ruha feltoltes
          </Button>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Ruha feltoltes
            </DialogTitle>
            <DialogContent dividers>
              <AddClothes
                addProduct={props.addProduct}
                handleClose={handleClose}
              />
            </DialogContent>
          </Dialog>
        </div>
      </>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch({ type: actions.FETCH_PRODUCTS }),
  deleteProduct: payload => dispatch({ type: actions.DELETE_PRODUCT, payload }),
  addProduct: payload => dispatch({ type: actions.ADD_PRODUCT, payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
