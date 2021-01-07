import React, { useState } from "react";
import ItemCart from "./itemCart";
import { withRouter } from "react-router-dom";
import CartDropDownUser from "./DropDownUser";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { Button, Box, Menu, Badge } from "@material-ui/core";

import { connect } from "react-redux";
import {
  selectCartItemsCount,
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
}));

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

const CartDropDown = ({ cartItems, itemCount, history, total }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toCheckout = () => {
    history.push("checkout");
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button onClick={handleClick}>
        <Badge badgeContent={itemCount} color="primary">
          <LocalMallOutlinedIcon />
        </Badge>
      </Button>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.typography}>
          {cartItems.length ? (
            cartItems.map((cartItem) => {
              return <ItemCart key={cartItem.id} item={cartItem} />;
            })
          ) : (
            <p>Váš košík je prázdný</p>
          )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            my={2}
          >
            <Box fontSize={22}>Celková cena:</Box>
            <Box color="neutral.main" fontWeight="fontWeightBold" fontSize={30}>
              {total} Kč
            </Box>
          </Box>
          <Button
            onClick={toCheckout}
            variant="contained"
            color="primary"
            fullWidth
            disabled={cartItems.length ? false : true}
          >
            přejít do košíku
          </Button>
          <CartDropDownUser handleClose={handleClose} />
        </div>
      </StyledMenu>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropDown)
);
