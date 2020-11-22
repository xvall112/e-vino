import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TypographyStyle, GoogleFont } from "react-typography";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import SignIn from "./pages/SignIn";
import HomePage from "./pages/Home";
import Navigation from "./components/navigation";
import CheckoutPage from "./pages/checkout";
import SignUp from "./pages/SignUp";

import GlobalStyle from "./root-wrapper";
import typography from "./utils/typography";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

/* import CurrentUserContext from "./contexts/current-user/current-user.context"; */
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
const App = props => {
  /*  const [currentUser, setCurrentUser] = useState(null); */

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          /*    setCurrentUser({ id: snapShot.id, ...snapShot.data() }); */
          props.setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      } else {
        /* setCurrentUser(userAuth); */
        props.setCurrentUser(userAuth);
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
      {/*  <CurrentUserContext.Provider value={currentUser}> */}
      <Navigation />
      {/*    </CurrentUserContext.Provider> */}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/checkout" exact>
          <CheckoutPage />
        </Route>
        <Route path="/signIn" exact>
          {props.currentUser ? <Redirect to="/" /> : <SignIn />}
        </Route>
        <Route path="/signUp" exact>
          {props.currentUser ? <Redirect to="/" /> : <SignUp />}
        </Route>
      </Switch>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
