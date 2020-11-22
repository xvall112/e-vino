import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { toggleCartHidden } from "../redux/cart/cart.action";
import { selectCartItemsCount } from "../redux/cart/cart.selectors";
import { selectCartHidden } from "../redux/cart/cart.selectors";

/* import { CartContext } from "../providers/cart/cart.provider"; */

import CartDropDown from "./cartDropDown";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ hiddenCart, toggleCartHidden, itemCount }) => {
  /*  const { handleToggleHidden, hiddenCart } = useContext(CartContext); */
  return (
    <>
      <Button /* onClick={handleToggleHidden} */ onClick={toggleCartHidden}>
        <Badge badgeContent={itemCount} color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </Button>
      {hiddenCart && <CartDropDown />}
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
  hiddenCart: selectCartHidden,
  itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
