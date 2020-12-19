import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase/firebase.utils";

import { signOutStart } from "../redux/user/user.actions";

/* import CurrentUserContext from "../contexts/current-user/current-user.context"; */

const ProfileIcon = ({ currentUser, signOutStart }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  /* const currentUser = useContext(CurrentUserContext); */

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
console.log(currentUser);
  return (
    <Wrapper>
      <Button onClick={handleClick}>
        <Avatar
          aria-controls="simple-menu"
          aria-haspopup="true"
          src={currentUser ? currentUser.photoURL : "/broken-image.jpg"}
        />
      </Button>
      {currentUser ? (
        <Menu
          onClick={handleClose}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <div className="items">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar src={currentUser.photoURL} />
                <div className="profile-item_name">
                  {currentUser.displayName}
                </div>
                <div className="profile-item_email">{currentUser.email}</div>
              </Grid>
            </div>
          </MenuItem>
          <MenuItem>Moje Objednávky</MenuItem>
          {currentUser.roles === "admin" && (
            <Link to="/admin">
              <MenuItem>Admin</MenuItem>
            </Link>
          )}

          <MenuItem>
            <Button
              onClick={signOutStart}
              fullWidth
              variant="outlined"
              color="primary"
            >
              Odhlásit se
            </Button>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} variant="outlined">
            <Link to="signIn">
              <Button fullWidth variant="outlined" color="primary">
                Přihlásit se
              </Button>
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="signUp">
              <Button fullWidth variant="contained" color="primary">
                Registrovat se
              </Button>
            </Link>
          </MenuItem>
        </Menu>
      )}
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => {
    dispatch(signOutStart());
  }
});

const Wrapper = styled.div`
  .items {
    background-color: green;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
