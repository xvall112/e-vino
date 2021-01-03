import { createMuiTheme } from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";

export const theme = createMuiTheme({
  palette: {
    primary: { main: blue[700] },
    backgroundUser: "linear-gradient(150deg, #359cd7 10%, #7d6efb 100%)",
  },
});
