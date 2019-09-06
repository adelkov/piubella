import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import { SignIn } from "./SignIn";
import SignUp from "./SignUp";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const CenteredTabs = props => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SignIn login={props.login} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp register={props.register} />
      </TabPanel>
    </>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  auth: () => dispatch({ type: actions.AUTHENTICATE }),
  register: fields => dispatch({ type: actions.REGISTER, fields }),
  logout: () => dispatch({ type: actions.LOGOUT }),
  addUser: () => dispatch({ type: actions.ADD_USER }),
  login: fields => dispatch({ type: actions.LOGIN, fields })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenteredTabs);
