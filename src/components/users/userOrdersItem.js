import React from "react";
import styled from "styled-components";
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
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return (
    <>
      <Accordion square>
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

            {order.items.map((item) => {
              return (
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  key={item.id}
                  spacing={2}
                >
                  <Grid item xs={2} md={"auto"}>
                    <Img src={item.image} />
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container>
                      <Grid item xs={12} md={3}>
                        {item.quantity} x {item.name}
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Box
                          fontWeight="fontWeightBold"
                          textAlign={{ xs: "left", md: "right" }}
                        >
                          {item.itemTotalPrice} Kč
                        </Box>
                      </Grid>
                    </Grid>
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

const Img = styled("img")`
  width: auto;
  height: 70px;
  margin-bottom: 10px;
`;
export default UserOrdersItem;
