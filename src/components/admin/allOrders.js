import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";

import AllOrdersTableRow from "./allOrdersTableRow";

import { selectAllOrders } from "../../redux/orders/orders.selector";
import { fetchOrdersStart } from "../../redux/orders/orders.action";

export const AllOrders = ({ allOrders, fetchAllOrders }) => {
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <Container>
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead bgcolor={grey[200]}>
                <TableRow>
                  <TableCell />
                  <TableCell>Id objednavky</TableCell>
                  <TableCell>Datum</TableCell>
                  <TableCell>Celkem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allOrders.map((order) => (
                  <AllOrdersTableRow key={order.id} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  allOrders: selectAllOrders,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllOrders: () => dispatch(fetchOrdersStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
