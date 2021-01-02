import React from "react";
import styled from "styled-components";
import { useSpring, animated as a } from "react-spring";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import DeleteWines from "./deleteWines";
import UpdateWines from "./updateWines";

import { connect } from "react-redux";
import { addItem, removeItem } from "../redux/cart/cart.action";
import { selectCurrentUser } from "../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../redux/cart/cart.selectors";

const Item = ({ item, addItem, removeItem, currentUser, cartItems }) => {
  const { image, druh, color, rocnik, name, price, id } = item;
  const inCart = cartItems.find((item) => item.id === id);

  const { transform, opacity } = useSpring({
    opacity: inCart ? 1 : 0,
    transform: `perspective(600px) rotateX(${inCart ? 180 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 80 },
  });

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
            {inCart ? (
              <a.div
                style={{
                  opacity,
                  transform: transform.interpolate(
                    (t) => `${t} rotateX(180deg)`
                  ),
                }}
              >
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => removeItem(item)}
                  >
                    -
                  </Button>
                  <Button>{inCart && inCart.quantity}</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItem(item)}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </a.div>
            ) : (
              <a.div
                style={{
                  opacity: opacity.interpolate((o) => 1 - o),
                  transform,
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => addItem(item)}
                >
                  do košíku
                </Button>
              </a.div>
            )}
          </Grid>
        </Grid>
        {currentUser ? (
          currentUser.id === process.env.REACT_APP_ADMIN_ID ? (
            <Grid container direction="row" justify="center">
              {" "}
              <UpdateWines item={item} />
              <DeleteWines name={name} id={id} />
            </Grid>
          ) : null
        ) : null}
      </Wrapper>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
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
