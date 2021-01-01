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
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";

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
  }, []);

  return (
    <div>
      <Container>
        <Box mt={2}>
          <TableContainer component={Paper}>
            {currentUserOrders ? (
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
                  {currentUserOrders.map((order, index) => (
                    <AllCurrentUserOrdersTableRow key={index} order={order} />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Box py={3} fontWeight="fontWeightBold">
                  Nemáte žádné objednávky
                </Box>
              </Grid>
            )}
          </TableContainer>
        </Box>
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
