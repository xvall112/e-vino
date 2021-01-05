import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";

import { signOutStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: "14px",
  },
  hr: {
    marginBottom: "0px",
  },
  link: {
    width: "100%",
    height: "100%",
  },
}));
const DropDownUser = ({ handleClose, currentUser, signOutStart }) => {
  const classes = useStyles();
  return (
    <Box mt={2}>
      <hr className={classes.hr} />
      <MenuItem disabled={currentUser ? false : true}>
        <Link to="/user" onClick={handleClose} className={classes.link}>
          <Box display="flex" flexDirection="row">
            <ListItemIcon>
              <ShoppingBasketIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Box className={classes.typography}>Moje objednávky</Box>
            </ListItemText>
          </Box>
        </Link>
      </MenuItem>
      <hr className={classes.hr} />
      {currentUser ? (
        <MenuItem onClick={signOutStart}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Box className={classes.typography}>
              Odhlásit - {currentUser.displayName}
            </Box>
          </ListItemText>
        </MenuItem>
      ) : (
        <Link to="/signIn" onClick={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Box className={classes.typography}>Přihlásit se</Box>
            </ListItemText>
          </MenuItem>
        </Link>
      )}
      <hr className={classes.hr} />
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(DropDownUser);
