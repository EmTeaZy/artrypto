import { red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import components from "./ComponentOverRide";
import shadows from "./Shadows";
import typography from "./Typoraphy";
const theme = createTheme({
  palette: {
    primary: {
      main: "#020710",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0B1224",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#FFFF",
      secondary: "#BBA0FE",
      card: "#FFFFFF80",
      price: "#C3C3C3",
      profit: "#00E3A4",
      loss: "#F43030",
    },
    background: {
      default: "#020710",
      secondary: "#0B101A",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
});
export default theme;
