import { createMuiTheme } from "@material-ui/core/styles";
import {
  primaryColor,
  secondaryColor,
  onBackgroundHE,
  onBackgroundLE,
} from "../Shared/theme";

export const darkTheme = createMuiTheme({
  typography: {
    fontFamily: [
      "Roboto Slab",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    type: "dark",
    primary: {
      dark: primaryColor,
      main: primaryColor,
    },
    secondary: {
      dark: secondaryColor,
      main: secondaryColor,
    },
    text: {
      primary: onBackgroundHE,
      secondary: onBackgroundLE,
    },
  },
});
