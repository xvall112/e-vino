import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteWines from "./deleteWines";

import { connect } from "react-redux";
import { addItem } from "../redux/cart/cart.action";
import { selectCurrentUser } from "../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

const Item = ({ item, addItem, currentUser }) => {
  const { image, druh, color, rocnik, name, price, id } = item;
  return (
    <Grid item xs={6} sm={4} md={3} lg={3}>
      <Wrapper>
        <img src={image} />
        <div className="info">
          <Grid container direction="row" justify="space-around">
            <Grid item>
              <Chip size="small" label={druh} />
            </Grid>
            <Grid item>
              <Chip size="small" label={color} />
            </Grid>
            <Grid item>
              <Chip size="small" label={rocnik} />
            </Grid>
          </Grid>
        </div>
        <div className="item-name">
          <h5>{name}</h5>
        </div>
        <Grid item></Grid>
        <Grid container direction="row" justify="center">
          <Grid item>
            <Button fullWidth variant="outlined" color="primary">
              {price} <span>Kč</span>
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
        {currentUser ? (
          currentUser.id === "1Zh2hy3lMLfMdy8BVWCvRFum79t1" ? (
            <Grid container direction="row" justify="center">
              {" "}
              <Button size="small" variant="outlined">
                upravit
              </Button>{" "}
              <DeleteWines name={name} id={id} />
            </Grid>
          ) : null
        ) : null}
      </Wrapper>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

const Wrapper = styled.section`
  padding-top: 20px;

  .MuiChip-label {
    font-size: 15px;
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);
