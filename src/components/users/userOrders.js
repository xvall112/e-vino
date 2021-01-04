import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
  heading: {
    fontWeight: theme.typography.fontWeightBold,
  },
  text: { fontWeight: theme.typography.fontWeightLight },
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

  const classes = useStyles();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
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
          currentUserOrders.map((order, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={12} md={4} className={classes.text}>
                    {order.id}
                  </Grid>
                  <Grid item xs={12} md={3} className={classes.text}>
                    {order.date.toDate().toLocaleDateString("cs-CZ", options)}
                  </Grid>
                  <Grid item xs={12} md={1} className={classes.heading}>
                    {order.celkem} Kč
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <hr />
                  <Grid container direction="row" className={classes.heading}>
                    <Grid item xs={6} md={4}>
                      Objednávka
                    </Grid>
                    <Grid item xs={2}>
                      ks
                    </Grid>
                  </Grid>
                  {order.items.map((item) => {
                    return (
                      <Grid container direction="row" key={item.id}>
                        <Grid item xs={6} md={4}>
                          {item.name}
                        </Grid>
                        <Grid item xs={2}>
                          {item.quantity} ks
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
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
