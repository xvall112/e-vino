import React, { useEffect } from "react";

import UserOrdersItem from "./userOrdersItem";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCurrentUserOrdersStart } from "../../redux/orders/orders.action";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectCurrentUserOrders } from "../../redux/orders/orders.selector";
import { selectLoad } from "../../redux/loading/loading.selector";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "30px",
  },
}));

const UserOrders = ({
  fetchCurrentUserOrders,
  currentUser,
  currentUserOrders,
  loading,
}) => {
  useEffect(() => {
    fetchCurrentUserOrders(currentUser.id);
  }, []);
  console.log(currentUser);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        {loading ? (
          <>
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="text" width="100%" height={100} />
          </>
        ) : (
          currentUserOrders.map((order, index) => {
            return <UserOrdersItem key={index} order={order} />;
          })
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserOrders: selectCurrentUserOrders,
  currentUser: selectCurrentUser,
  loading: selectLoad,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUserOrders: (currentUserId) =>
    dispatch(fetchCurrentUserOrdersStart(currentUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
