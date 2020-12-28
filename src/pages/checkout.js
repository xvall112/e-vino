import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartTotal } from "../redux/cart/cart.selectors";
import { selectCartItems } from "../redux/cart/cart.selectors";

import CheckoutItems from "../components/checkoutItems";
import StripeCheckoutButton from "../components/stripeButton";

const Checkout = ({ total, cartItems }) => {
  return (
    <div>
      <h2>Košík</h2>
      <CheckoutItems />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  total: selectCartTotal,
  cartItems: selectCartItems
});
export default connect(mapStateToProps)(Checkout);
