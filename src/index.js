import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store /* persistor */ } from "./redux/store";

import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";
/* import { PersistGate } from "redux-persist/integration/react"; */

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
