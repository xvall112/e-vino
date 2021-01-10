import { createMuiTheme } from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";

export const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorDefault: {
        background: "linear-gradient(150deg, #359cd7 10%, #7d6efb 100%)",
      },
    },
    MuiPaper: {
      rounded: { borderRadius: "0px" },
    },
    MuiBadge: {
      colorPrimary: {
        backgroundColor: "white",
        color: "#5c6ac4",
      },
    },

    MuiOutlinedInput: {
      root: { borderRadius: "0px" },
    },
    // Style sheet name ⚛️
    MuiButton: {
      root: { borderRadius: "0px" },
      // Name of the rule
      containedPrimary: {
        // Some CSS
        background: "linear-gradient(150deg, #359cd7 10%, #7d6efb 100%)",
        boxShadow: "none",
      },
    },
  },
  palette: {
    primary: { main: "#359cd7" },
    secondary: { main: "#7d6efb" },
    backgroundUser: "linear-gradient(150deg, #359cd7 10%, #7d6efb 100%)",
    neutral: {
      main: "#5c6ac4",
      light: "#359cd7",
      dark: "#7d6efb",
    },
    navigationIconColor: "white",
  },
});
