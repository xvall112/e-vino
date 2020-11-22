import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  clearItemFromCart,
  removeItem,
  addItem
} from "../redux/cart/cart.action";
import { selectCartItems, selectCartTotal } from "../redux/cart/cart.selectors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const CheckoutItems = ({
  cartItems,
  total,
  clearItem,
  removeItem,
  addItem,
  itemTotal
}) => {
  return (
    <Wrapper>
      <Container>
        <Grid container>
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
                  {cartItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.image}</TableCell>
                      <TableCell align="right">
                        <b>{item.name}</b>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => removeItem(item)}>
                          &#10094;
                        </Button>
                        {item.quantity}
                        <Button onClick={() => addItem(item)}>&#10095;</Button>
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
            <Grid container justify="center">
              <p>Košík je prázdný</p>
            </Grid>
          )}
          <span className="total">CELKEM: {total} Kč</span>
        </Grid>
      </Container>
    </Wrapper>
  );
};
const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  removeItem: item => dispatch(removeItem(item)),
  addItem: item => dispatch(addItem(item))
});
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

const Wrapper = styled.div`
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
