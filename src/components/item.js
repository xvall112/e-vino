import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addItem } from "../redux/cart/cart.action";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

const Item = ({ item, addItem }) => {
  const { image, druh, color, rocnik, name, price } = item;
  return (
    <Grid item xs={6} md={3}>
      <Wrapper>
        {image}
        <div className="info">
          <Grid container direction="row" justify="space-around">
            <Chip size="small" label={druh} />
            <Chip size="small" label={color} />
            <Chip size="small" label={rocnik} />
          </Grid>
        </div>
        <h3>{name}</h3>
        <Grid item></Grid>
        <Grid container direction="row" justify="center">
          <Grid item>
            <Button fullWidth variant="outlined" color="primary">
              {price} <span> Kč</span>
            </Button>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => addItem(item)}
            >
              do košíku
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

const Wrapper = styled.section`
  text-align: center;
  h3 {
    margin: 10px;
  }
  img {
    margin-bottom: 10px;
    margin: 0px auto;
    height: 200px;
  }
  p {
    margin-bottom: 5px;
  }
  .info {
    margin: 10px;
  }
`;

export default connect(null, mapDispatchToProps)(Item);
