import React from "react";
import { Grid, MenuItem, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const ItemCart = ({ item }) => {
  const classes = useStyles();
  const { image, name, quantity, price } = item;
  return (
    <MenuItem className={classes.root}>
      <Wrapper>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <img src={image} />
          </Grid>
          <Grid item>
            <Box pl={2} display="flex" flexDirection="column">
              <Box fontWeight={900}>{name}</Box>
              <Box fontSize={16}>
                {quantity} x {price} Kč
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
    </MenuItem>
  );
};

const useStyles = makeStyles((theme) => ({
  root: { paddingLeft: "0px" },
}));

const Wrapper = styled.div`
  margin-bottom: 10px;
  img {
    width: 25px;
    margin: 0px;
  }
`;
export default ItemCart;
