import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Button } from "@material-ui/core";

const NoOrders = ({ user }) => {
  return (
    <div>
      <Grid item>
        <Paper>
          <Box py={3}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Box mb={2} fontWeight="fontWeightLight">
                Nemáte žádné objednávky
              </Box>
              <Link to="/">
                {user && (
                  <Button variant="outlined" color="primary">
                    pokračovat v nákupu
                  </Button>
                )}
              </Link>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default NoOrders;
