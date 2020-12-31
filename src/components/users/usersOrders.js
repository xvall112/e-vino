import React, { useEffect } from "react";

import AllCurrentUserOrdersTableRow from "./allCurrentUserOrdersTableRow";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCurrentUserOrdersStart } from "../../redux/orders/orders.action";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectCurrentUserOrders } from "../../redux/orders/orders.selector";

const usersOrders = ({
  fetchCurrentUserOrders,
  currentUser,
  currentUserOrders,
}) => {
  useEffect(() => {
    fetchCurrentUserOrders(currentUser.id);
    console.log(currentUserOrders);
  }, []);

  return (
    <div>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Id objednavky</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Celkem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUserOrders.map((order, index) => (
                <AllCurrentUserOrdersTableRow key={index} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserOrders: selectCurrentUserOrders,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUserOrders: (currentUserId) =>
    dispatch(fetchCurrentUserOrdersStart(currentUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(usersOrders);
