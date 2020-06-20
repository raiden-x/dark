import { createMuiTheme } from "@material-ui/core/styles";
import {
  primaryColor,
  secondaryColor,
  onBackgroundHE,
  onBackgroundLE,
} from "../Shared/theme";

export const darkTheme = createMuiTheme({
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
