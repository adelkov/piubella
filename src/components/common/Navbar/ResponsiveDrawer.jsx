import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CreditCard from "@material-ui/icons/CreditCard";
import Explore from "@material-ui/icons/Explore";
import FaceIcon from "@material-ui/icons/Face";
import Home from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import { default as React } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";

const drawerWidth = 240;
const navigate = link => {
  window.location.hash = link;
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: "100%"
      // width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: { ...theme.mixins.toolbar, zIndex: 300 },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  icon: {
    margin: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const ResponsiveDrawer = props => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={classes.toolbar} />
      <Divider />

      <List>
        {props.auth.isAuth &&
          props.auth.role === "admin" &&
          adminTabs.map((tab, index) => (
            <ListItem button key={tab.title} onClick={() => navigate(tab.path)}>
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.title} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {props.auth.isAuth &&
          tabs.map((tab, index) => (
            <ListItem
              button
              key={tab.title}
              onClick={() => navigate(tab.path)}
              className="navButton"
            >
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.title} />
            </ListItem>
          ))}
      </List>
      {props.auth.isAuth && (
        <Button
          onClick={props.logout}
          color="primary"
          variant="contained"
          style={{ alignSelf: "center" }}
        >
          Logout
        </Button>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 100,
            height: 30
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {props.auth.isAuth && (
            <Chip
              icon={<FaceIcon />}
              label={props.auth.orgName}
              clickable
              className={classes.chip}
              color="secondary"
              deleteIcon={<FaceIcon />}
            />
          )}
          <Typography variant="h6" noWrap>
            <img
              height="160px"
              src={window.location.origin + "/logo_black-01.png"}
              alt=""
            />
          </Typography>
        </Toolbar>
      </AppBar>
      {props.auth.isAuth && (
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: actions.LOGOUT })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveDrawer);

const adminTabs = [
  {
    path: "/users",
    title: "Felhasznalok",
    icon: <SupervisedUserCircle color="primary" style={{ fontSize: 40 }} />
  },
  {
    path: "/admin",
    title: "Ruhak",
    icon: <Home color="primary" style={{ fontSize: 40 }} />
  },
  {
    path: "/orders",
    title: "Rendelesek",
    icon: <CreditCard color="primary" style={{ fontSize: 40 }} />
  }
];

const tabs = [
  {
    path: "/home",
    title: "Bolt",
    icon: <Explore color="primary" style={{ fontSize: 40 }} />
  },
  {
    path: "/cart",
    title: "Kosar",
    icon: (
      // <Badge
      //   badgeContent={"items"}
      //   color="error"
      // >
      <ShoppingBasket color="primary" style={{ fontSize: 40 }} />
      // </Badge>
    )
  }
];
