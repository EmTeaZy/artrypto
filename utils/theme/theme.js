import {createTheme} from "@mui/material/styles";
import components from "./ComponentOverRide";
import shadows from "./Shadows";
import typography from "./Typoraphy";

const theme = createTheme({
  palette: {
    primary: {
      main: "#202225",
      light: "#e5fafb",
      dark: "#0662da",
      contrastText: "#F2B809",
    },
    secondary: {
      main: "#F2B809",
      light: "#fcf1ed",
      dark: "#e67e5f",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c21a",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",
      dark: "#e45a68",
    },
    warning: {
      main: "#fec90f",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    text: {
      primary:"#FFFFFF",
      secondary: "#8A939B",
      contrast:"#F2B809",
      danger: "#fc4b6c",
      success: "#00c21a",
      tertiary: "#000000",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "#FFFFFF",
      disabled:"#FFFFFF",
      hoverOpacity: 0.02,
      hover: "#4C505C",
    },
    background: {
      default: "#202225",
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: "64px",
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  components,
  shadows,
  typography,
});
export default theme;
