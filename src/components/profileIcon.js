import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase/firebase.utils";

/* import CurrentUserContext from "../contexts/current-user/current-user.context"; */

const ProfileIcon = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  /* const currentUser = useContext(CurrentUserContext); */

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <Avatar
          aria-controls="simple-menu"
          aria-haspopup="true"
          src={currentUser ? currentUser.photoURL : "/broken-image.jpg"}
        />
      </Button>
      {currentUser ? (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Moje Objednávky</MenuItem>
          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => auth.signOut()}
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(ProfileIcon);
