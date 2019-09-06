import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { default as React, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";

const useStylesPaper = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    margin: "auto"
  },
  emptyPaper: {
    padding: 60
  }
}));

export const Cart = props => {
  const classes = useStylesPaper();

  useEffect(() => {
    props.loadCart(props.cartId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {props.total === 0 ? (
        <Paper className={classes.emptyPaper}>
          <Typography variant="h2">Ures a kosar</Typography>
        </Paper>
      ) : (
        <Paper className={classes.root}>
          <SimpleTable
            rows={props.cart}
            total={props.total}
            deleteFromCart={props.deleteFromCart}
            cartId={props.cartId}
          />
          szoveg hogy hogy kell fizetni
          <Button
            disabled={props.total === 0}
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => props.order(props.email, props.cart, props.cartId)}
          >
            Rendeles leadasa
          </Button>
        </Paper>
      )}{" "}
    </>
  );
};

const mapStateToProps = state => ({
  cart: state.cart.cart,
  cartId: state.auth.cart,
  total: state.cart.total,
  email: state.auth.email
});

const mapDispatchToProps = dispatch => ({
  loadCart: id => dispatch({ type: actions.LOAD_CART, id }),
  deleteFromCart: (cartId, code, cart) =>
    dispatch({
      type: actions.DELETE_FROM_CART,
      payload: { cartId, code, cart }
    }),
  order: (email, cart, cartId) =>
    dispatch({ type: actions.ORDER, payload: { email, cart, cartId } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    display: "flex",
    flexDirection: "column",
    paddingTop: 32
  },
  table: {
    minWidth: 850
  },
  icon: {
    alignSelf: "center"
  }
}));

const SimpleTable = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <FontAwesomeIcon
        icon={faShoppingBasket}
        size="5x"
        color="white"
        className={classes.icon}
      />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Ruha</TableCell>
            <TableCell align="right">Kod</TableCell>
            <TableCell align="right">Ar (Netto Ft)</TableCell>
            <TableCell align="right">AFA (Ft)</TableCell>
            <TableCell align="right">Mennyiseg</TableCell>
            <TableCell align="right">Osszesen (Brutto Ft) </TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <TableRow key={row.code}>
              <TableCell component="th" scope="row">
                <img width="60px" src={row.images} alt={row.code} />
              </TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{formatNumber(row.price)}</TableCell>
              <TableCell align="right">{(row.price / 100) * 27}</TableCell>
              <TableCell align="right">{row.quant}</TableCell>
              <TableCell align="right">
                {formatNumber((row.quant * row.price * 1.27))}
              </TableCell>
              <TableCell align="right">
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() =>
                    props.deleteFromCart(props.cartId, row.code, props.rows)
                  }
                >
                  Torol
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">
              Osszesen (Ft)
            </TableCell>
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right"></TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}