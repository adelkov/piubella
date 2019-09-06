import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { default as React, useEffect } from "react";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";

import * as actions from "../../../store/actions/actions";
import ImageModal from "../../common/ImageModal/ImageModal";
import OrderModal from "../../common/OrderModal/OrderModal";

const useStyles = makeStyles({
  card: {
    minWidth: 320,
    maxWidth: 500,
    float: "left",
    margin: "2%"
  },
  media: {
    height: 360
  }
});

let myElements = [];

const SingleLineGridList = props => {
  const [selectedProduct, setSelectedProduct] = React.useState({});

  const [openOrder, setOpenOrder] = React.useState(false);
  function handleClickOpenOrder(product) {
    setSelectedProduct(product);
    setOpenOrder(true);
  }
  function handleCloseOrder() {
    setOpenOrder(false);
  }

  const [openImage, setOpenImage] = React.useState(false);
  function handleClickOpenImage(product) {
    setSelectedProduct(product);
    setOpenImage(true);
  }
  function handleCloseImage() {
    setOpenImage(false);
  }

  useEffect(() => {
    props.fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  return (
    <div>
      {props.products &&
        props.products.map((product, index) => (
          <Card
            className={classes.card}
            key={product.code}
            ref={li => (myElements[index] = li)}
          >
            <CardActionArea onClick={() => handleClickOpenImage(product)}>
              <CardMedia
                className={classes.media}
                image={product.images[0]}
                title="Ruha"
              />
              <CardContent style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.code}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  <Chip label={product.price + " Ft + AFA"} color="primary" />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleClickOpenOrder(product)}
              >
                Kosarba teszem
              </Button>
            </CardActions>
          </Card>
        ))}
      <OrderModal
        open={openOrder}
        handleClose={handleCloseOrder}
        product={selectedProduct}
      />
      <ImageModal
        handleClose={handleCloseImage}
        code={selectedProduct.code}
        images={selectedProduct.images}
        open={openImage}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch({ type: actions.FETCH_PRODUCTS })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleLineGridList);
