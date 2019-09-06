import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { configStore } from "./store/ConfigStore";
import MainRoutes from "./components/MainRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import firebase from "firebase";
import { firebaseConfig } from "./store/utils/fireBaseConfig";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import muiTheme from "./styles/muiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

firebase.initializeApp(firebaseConfig);

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <MainRoutes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
