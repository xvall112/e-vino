import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../stripe/CheckoutForm";

import img from "../images/whiteWine.png";

import Grid from "@material-ui/core/Grid";

const stripePromise = loadStripe(
  "pk_test_51HpYCQKEyk35vjKBM4urrGtuBsiGvpeEG14Kf0iepId57QnBw5IOzIYfmPePOFYmROQ0iBDcFiaYcBJ6gu7xjAru00zkYA3f4q"
);

const StripeButton = () => {
  return (
    <>
      <h1> Stripe StripeButton</h1>
      <Grid item xs={12} lg={4}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Grid>
    </>
  );
};

export default StripeButton;
