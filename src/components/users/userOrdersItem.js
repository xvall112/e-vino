import React from "react";

import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const UserOrdersItem = ({ order }) => {
  const classes = useStyles();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <Accordion>
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
              <Box textAlign="right">{order.celkem} Kč</Box>
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
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: theme.typography.fontWeightBold,
  },
  text: { fontWeight: theme.typography.fontWeightLight },
}));

export default UserOrdersItem;
