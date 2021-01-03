import React, { useState } from "react";
import ItemCart from "./itemCart";
import { withRouter } from "react-router-dom";
import CartDropDownUser from "./DropDownUser";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

import { connect } from "react-redux";
import {
  selectCartItemsCount,
  selectCartItems,
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
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const CartDropDown = ({ cartItems, itemCount, history }) => {
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
      <IconButton onClick={handleClick}>
        <Badge badgeContent={itemCount} color="primary">
          <LocalMallOutlinedIcon />
        </Badge>
      </IconButton>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.typography}>
          <Grid container direction="column">
            <h2>Košík</h2>

            {cartItems.length ? (
              cartItems.map((cartItem) => {
                return <ItemCart key={cartItem.id} item={cartItem} />;
              })
            ) : (
              <p>Váš košík je prázdný</p>
            )}

            <Button
              onClick={toCheckout}
              variant="contained"
              color="primary"
              fullWidth
              disabled={cartItems.length ? false : true}
            >
              Do Košíku
            </Button>

            <CartDropDownUser handleClose={handleClose} />
          </Grid>
        </div>
      </StyledMenu>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropDown)
);
