import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";

import { signOutStart } from "../../redux/user/user.actions";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: "16px",
  },
  icon: {
    color: theme.palette.navigationIconColor,
  },
}));

const BoxStyled = withStyles((theme) => ({
  root: { background: theme.palette.backgroundUser },
}))(Box);

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const ProfileIcon = ({ currentUser, signOutStart }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Wrapper>
      <Button onClick={handleClick}>
        {currentUser ? (
          currentUser.photoURL ? (
            <Avatar src={currentUser.photoURL} />
          ) : (
            <PersonIcon className={classes.icon} />
          )
        ) : (
          <PersonIcon className={classes.icon} />
        )}
      </Button>
      {currentUser ? (
        <StyledMenu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box my={1}>
            <MenuItem>
              <BoxStyled p={2} px={5} width={1}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <AvatarStyled src={currentUser.photoURL} />
                  <Box fontWeight={900} color="white">
                    {currentUser.displayName}
                  </Box>
                  <Box fontSize={16} color="white" fontWeight="fontWeightLight">
                    {currentUser.email}
                  </Box>
                </Grid>
              </BoxStyled>
            </MenuItem>
            <Link to="/user" onClick={handleClose}>
              <MenuItemStyled>
                <ListItemIcon>
                  <ShoppingBasketIcon fontSize="small" />
                </ListItemIcon>
                <ListItemTextStyled>
                  <Box className={classes.typography}>Moje objednávky</Box>
                </ListItemTextStyled>
              </MenuItemStyled>
            </Link>
            {currentUser ? (
              currentUser.id === process.env.REACT_APP_ADMIN_ID ? (
                <Link to="/admin" onClick={handleClose}>
                  <MenuItemStyled>
                    <ListItemIcon>
                      <SupervisorAccountIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemTextStyled>
                      <Box className={classes.typography}>Admin</Box>
                    </ListItemTextStyled>
                  </MenuItemStyled>
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
          </Box>
        </StyledMenu>
      ) : (
        <StyledMenu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box>
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
          </Box>
        </StyledMenu>
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

const MenuItemStyled = styled(MenuItem)`
  font-size: 16px;
`;
const ListItemTextStyled = styled(ListItemText)`
  font-size: 16px;
`;
const AvatarStyled = styled(Avatar)`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
`;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
