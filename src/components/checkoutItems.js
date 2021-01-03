import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  clearItemFromCart,
  removeItem,
  addItem,
  addOrderStart,
} from "../redux/cart/cart.action";
import { selectCartItems, selectCartTotal } from "../redux/cart/cart.selectors";
import { selectCurrentUser } from "../redux/user/user.selector";

const CheckoutItems = ({
  cartItems,
  total,
  clearItem,
  removeItem,
  addItem,
  itemTotal,
  addOrder,
  currentUser,
}) => {
  return (
    <Wrapper>
      <Container>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          direction="column"
        >
          {cartItems.length ? (
            <TableContainer>
              <Table aria-label="simple table" padding="checkbox">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Produkt</TableCell>
                    <TableCell align="right">Název</TableCell>
                    <TableCell align="right">Množství</TableCell>
                    <TableCell align="right">Cena</TableCell>
                    <TableCell align="right">Odebrat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">
                        <img src={item.image} />
                      </TableCell>
                      <TableCell align="right">
                        <b>{item.name}</b>
                      </TableCell>
                      <TableCell align="right">
                        <div className="button">
                          <span onClick={() => removeItem(item)}>&#10094;</span>

                          {item.quantity}
                          <span onClick={() => addItem(item)}>&#10095;</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {item.itemTotalPrice}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="secondary"
                          onClick={() => clearItem(item)}
                        >
                          &#10005;
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Grid
              container
              justify="space-around"
              alignItems="center"
              direction="column"
            >
              <h5>Košík je prázdný</h5>
            </Grid>
          )}
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {!currentUser && (
              <Box my={2}>
                <Alert severity="info">
                  pro objednání musíte <Link to="signIn">přihlásit se </Link>
                  nebo <Link to="signUp">registrovat se</Link>
                </Alert>
              </Box>
            )}
            <Box mb={2}>
              <Grid item>
                <span className="total">CELKEM: {total} Kč</span>
              </Grid>
            </Box>

            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-around"
              spacing={2}
            >
              <Grid item xs={12} md={3}>
                <Link to="/">
                  <Button fullWidth variant="outlined" color="primary">
                    pokračovat v nákupu
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => addOrder({ cartItems, currentUser, total })}
                  disabled={
                    cartItems.length === 0 ? true : false || !currentUser
                  }
                >
                  Objednat
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};
const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  addItem: (item) => dispatch(addItem(item)),
  addOrder: (order) => dispatch(addOrderStart(order)),
});
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currentUser: selectCurrentUser,
});

const Wrapper = styled.div`
  margin-top: 40px;
  padding-bottom: 50px;

  a {
    color: blue;
    text-decoration: none;
  }
  .button {
    span {
      padding: 10px;
      cursor: pointer;
    }
  }
  .MuiTableCell-body {
    font-size: 15px;
  }
  .MuiTableCell-head {
    font-size: 15px;
  }
  img {
    width: 50px;
    margin: 0 auto;
    padding: 5px;
  }
  .total {
    font-weight: 700;
    font-size: 40px;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItems);
