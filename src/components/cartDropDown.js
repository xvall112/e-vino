import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../redux/cart/cart.selectors";
import { toggleCartHidden } from "../redux/cart/cart.action";

import ItemCart from "./itemCart";

/* import { CartContext } from "../providers/cart/cart.provider"; */

const CartDropDown = ({ cartItems, history, dispatch }) => {
  /* const { cartItems } = useContext(CartContext); */
  return (
    <Wrapper>
      <div className="cart-dropdown">
        <Card>
          <CardContent>
            <h2>Košík</h2>
            <div className="cart-item">
              {cartItems.length ? (
                cartItems.map(cartItem => {
                  return <ItemCart key={cartItem.id} item={cartItem} />;
                })
              ) : (
                <p>Váš košík je prázdný</p>
              )}
            </div>
            <Button
              onClick={() => {
                history.push("checkout");
                dispatch(toggleCartHidden());
              }}
              variant="contained"
              color="primary"
              fullWidth
              disabled={cartItems.length ? false : true}
            >
              Do Košíku
            </Button>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

const Wrapper = styled.div`
  z-index: 10000;
  position: absolute;
  top: 50px;
  right: 30px;

  .cart-dropdown {
    width: 400px;
  }
  .cart-item {
    overflow: auto;
    max-height: 200px;
  }
`;
export default withRouter(connect(mapStateToProps)(CartDropDown));
