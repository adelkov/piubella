import firebase from "firebase";
import React from "react";
import { connect } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { HashRouter, Route } from "react-router-dom";

import ResponsiveDrawer from "../components/common/Navbar/ResponsiveDrawer";
import Cart from "../components/views/Cart/Cart";
import Orders from "../components/views/Orders/Orders";
import * as actions from "../store/actions/actions";
import Admin from "./views/Admin/Admin";
import Contact from "./views/Contact/Contact";
import Home from "./views/Home/Home";
import Credentials from "./views/Login/Credentials";
import Users from "./views/Users/Users";

const MainRoutes = props => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      props.autoAuth(user.email);
    }
  });
  return (
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      <HashRouter>
        <ResponsiveDrawer>
          <Route path="/login" exact component={Credentials} />
          <Route path="/" exact component={Home} />
          {props.isAuth &&
            routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
              />
            ))}
          {props.isAuth &&
            props.role === "admin" &&
            adminRoutes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
              />
            ))}
        </ResponsiveDrawer>
      </HashRouter>
    </div>
  );
};

const mapStateToProps = state => ({
  role: state.auth.role,
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  autoAuth: email => dispatch({ type: actions.AUTO_AUTH, email })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRoutes);

const routes = [
  { path: "/home", component: Home },
  { path: "/contact", component: Contact },
  { path: "/cart", component: Cart }
];

const adminRoutes = [
  { path: "/admin", component: Admin },
  { path: "/users", component: Users },
  { path: "/orders", component: Orders }
];
