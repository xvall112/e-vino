import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const ItemCart = ({ item }) => {
  const { image, name, quantity, price } = item;
  return (
    <Wrapper>
      <Grid container direction="row" alignItems="center">
        <Grid item><img src={image}/></Grid>
        <Grid item>
          <div className="cartItem-price">
            <h6>{name}</h6> {quantity} x {price}
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 10px;
  img {
    margin-top: 10px;
    width: 20px;
  }
  h6 {
    margin: 0px;
  }
  .cartItem_price {
    padding-left: 10px;
  }
`;
export default ItemCart;
