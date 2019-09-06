import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper'

const ImageModal = props => (
  <Dialog
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">{props.code}</DialogTitle>
    <DialogContent>
    <SwipeableTextMobileStepper images={props.images}/>  
      {/* {props.images &&
        props.images.map((image, i) => (
          <img key={i} src={image} alt={props.code} width="100%" />
        ))} */}
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color="primary" autoFocus>
        Bezar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ImageModal;
