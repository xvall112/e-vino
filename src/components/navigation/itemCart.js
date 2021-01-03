import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const ItemCart = ({ item }) => {
  const { image, name, quantity, price } = item;
  return (
    <Wrapper>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <img src={image} />
        </Grid>
        <Grid item>
          <Box pl={2} display="flex" flexDirection="column">
            <Box fontWeight={900}>{name}</Box> {quantity} x {price}
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 10px;
  img {
    width: 25px;
    margin: 0px;
  }
`;
export default ItemCart;
