import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TypographyStyle, GoogleFont } from "react-typography";
import GlobalStyle from "./root-wrapper";
import typography from "./utils/typography";

import SignIn from "./pages/SignIn";
import HomePage from "./pages/Home";
import Navigation from "./components/navigation";
import CheckoutPage from "./pages/checkout";
import SignUp from "./pages/SignUp";
import AdminPage from "./pages/admin";
import UserPage from "./pages/user";

import Box from "@material-ui/core/Box";

import { selectCurrentUser } from "./redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { checkUserSession } from "./redux/user/user.actions";

/* import CurrentUserContext from "./contexts/current-user/current-user.context"; */

const App = ({ currentUser, checkUserSession }) => {
  /*  const [currentUser, setCurrentUser] = useState(null); */
  const unsubscribeFromAuth = null;
  useEffect(() => {
    checkUserSession();
    return () => {
      /*  unsubscribeFromAuth(); */
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />

      <Navigation />
      <Box pt={6}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/checkout" exact>
            <CheckoutPage />
          </Route>
          <Route path="/signIn" exact>
            {currentUser ? <Redirect to="/" /> : <SignIn />}
          </Route>
          <Route path="/signUp" exact>
            {currentUser ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route path="/user" exact>
            {currentUser ? <UserPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/admin" exact>
            {currentUser ? (
              currentUser.id === process.env.REACT_APP_ADMIN_ID ? (
                <AdminPage />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Box>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
