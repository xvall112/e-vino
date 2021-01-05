import React, { useEffect } from "react";

import OrdersItem from "./ordersItem";
import NoOrders from "../noOrders";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Filtering from "./filterAdmin";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAllOrders,
  sortOrdersBySelect,
} from "../../redux/orders/orders.selector";
import { fetchOrdersStart } from "../../redux/orders/orders.action";
import { selectLoad } from "../../redux/loading/loading.selector";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "30px",
  },
}));

const Orders = ({ fetchOrders, allOrders, loading }) => {
  useEffect(() => {
    fetchOrders();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Box my={2}>
          <Filtering />
        </Box>
        {loading ? (
          <>
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="text" width="100%" height={100} />
          </>
        ) : allOrders.length ? (
          allOrders.map((order) => {
            return <OrdersItem key={order.id} order={order} />;
          })
        ) : (
          <NoOrders />
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allOrders: selectAllOrders,
  loading: selectLoad,
  sortOrdersBySelect: sortOrdersBySelect,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrdersStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
