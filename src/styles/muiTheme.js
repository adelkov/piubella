import { createMuiTheme } from "@material-ui/core/styles";

const muiTheme = createMuiTheme({
  palette: {
    background: {
      paper: "rgba(0, 0, 0, 0.2)",
      default: "rgba(0, 0, 0, 0.3)"
    },
    primary: {
      light: "#fff",
      main: "#77dac9",
      dark: "#ff48b09e"
    },
    secondary: {
      main: "#000"
    },
    text: {
      primary: "#fff",
      secondary: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default muiTheme;
