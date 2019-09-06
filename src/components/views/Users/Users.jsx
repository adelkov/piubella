import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DoneIcon from "@material-ui/icons/Done";
import FaceIcon from "@material-ui/icons/Face";
import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import * as actions from "../../../store/actions/actions";
import AddUserForm from "./AddUserForm";

const useStyles = makeStyles(theme => ({
  root: {

    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: "30px",
    marginBottom: theme.spacing(3)
  }
}));

const Users = props => {
  useEffect(() => {
    props.fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant='h5'>Adminok:</Typography>
        {props.users
              .filter(user => user.role === "admin")
              .map(user => (
                <Chip
                avatar={
                  <Avatar>
                    <FaceIcon />
                  </Avatar>
                }
                label={user.orgName + " - " + user.email}
                className={classes.chip}
                color="primary"
              />
              ))}

      </Paper>
      <Paper className={classes.paper}>
      <Typography variant='h5'>Kereskedok:</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Ceg</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Cim</TableCell>
              <TableCell>Adoszam</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users
              .filter(user => user.role === "retailer")
              .map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.orgName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telefon}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.taxid}</TableCell>
                  <TableCell>
                    {user.role ? (
                      <div>
                        {" "}
                        <Chip
                          avatar={
                            <Avatar>
                              <DoneIcon />
                            </Avatar>
                          }
                          label="Confirmed"
                          className={classes.chip}
                          color="primary"
                        />
                      </div>
                    ) : (
                      <div>
                        <Chip
                          avatar={
                            <Avatar>
                              <FaceIcon />
                            </Avatar>
                          }
                          label="Invited"
                          className={classes.chip}
                          color="secondary"
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
      <AddUserForm addUser={props.addUser} />
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users.users,
  loading: state.users.loading,
  error: state.users.error
});

const mapDispatchToProps = dispatch => ({
  addUser: (email, name) =>
    dispatch({ type: actions.ADD_USER, payload: { email, name } }),
  fetchUsers: () => dispatch({ type: actions.FETCH_USERS })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
