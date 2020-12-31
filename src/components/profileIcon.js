import React, { useState } from "react";
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
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";

import { signOutStart } from "../redux/user/user.actions";

/* import CurrentUserContext from "../contexts/current-user/current-user.context"; */

const ProfileIcon = ({ currentUser, signOutStart }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  /* const currentUser = useContext(CurrentUserContext); */

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      <Button onClick={handleClick}>
        {currentUser ? (
          <Avatar
            aria-controls="simple-menu"
            aria-haspopup="true"
            src={currentUser.photoURL}
          />
        ) : (
          <PersonIcon />
        )}
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
              <Box border={1} p={2} mx={5} borderRadius={16}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <AvatarStyled src={currentUser.photoURL} />
                  <Box fontWeight={900}>{currentUser.displayName}</Box>
                  <Box fontSize={16} fontWeight="fontWeightLight">
                    {currentUser.email}
                  </Box>
                </Grid>
              </Box>
            </div>
          </MenuItem>
          <Link to="/user">
            <MenuItems>Moje Objednávky</MenuItems>
          </Link>
          {currentUser ? (
            currentUser.id === process.env.REACT_APP_ADMIN_ID ? (
              <Link to="/admin">
                <MenuItems>Admin</MenuItems>
              </Link>
            ) : null
          ) : null}

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
          <Link to="signIn">
            <MenuItem onClick={handleClose} variant="outlined">
              <Button fullWidth variant="outlined" color="primary">
                Přihlásit se
              </Button>
            </MenuItem>
          </Link>
          <Link to="signUp">
            <MenuItem onClick={handleClose}>
              <Button fullWidth variant="contained" color="primary">
                Registrovat se
              </Button>
            </MenuItem>
          </Link>
        </Menu>
      )}
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => {
    dispatch(signOutStart());
  },
});

const Wrapper = styled.div``;
const MenuItems = styled(MenuItem)`
  font-size: 16px;
`;
const AvatarStyled = styled(Avatar)`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
`;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
