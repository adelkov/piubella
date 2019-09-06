import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

export default function OrdersPanel(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      {props.orders &&
        props.orders.map(order => (
          <ExpansionPanel
            key={order.id}
            expanded={expanded === order.id}
            onChange={handleChange(order.id)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Typography className={classes.secondaryHeading}>
                  {order.email}
                </Typography>
                <Typography className={classes.heading}>
                  {order.cart.timestamp}
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SimpleTable rows={order.cart} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
}

const useStylesTable = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const SimpleTable = props => {
  const classes = useStylesTable();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Ruha</TableCell>
            <TableCell align="right">Kod</TableCell>
            <TableCell align="right">Ar (Netto Ft)</TableCell>
            <TableCell align="right">AFA (Ft)</TableCell>
            <TableCell align="right">Mennyiseg</TableCell>
            <TableCell align="right">Osszesen (Brutto Ft)</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows &&
            props.rows.cart.map(row => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  <img width="60px" src={row.images} alt={row.code} />
                </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{formatNumber(row.price)}</TableCell>
                <TableCell align="right">
                  {formatNumber((row.price / 100) * 27)}
                </TableCell>
                <TableCell align="right">{row.quant}</TableCell>
                <TableCell align="right">
                  {formatNumber(row.quant * row.price * 1.27)}
                </TableCell>
                <TableCell align="right" />
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
            <TableCell align="right">
              {formatNumber(props.rows.cart.reduce((acc, item) => {
                return (item.price * item.quant * 1.27) + acc
              }, 0))} 
            </TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
