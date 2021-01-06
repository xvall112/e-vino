import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartIcon from "../components/navigation/cartDropDown";
import ProfileIcon from "./navigation/profileIcon";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  AppBar,
  LinearProgress,
  Box,
} from "@material-ui/core";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";
import { selectLoad } from "../redux/loading/loading.selector";
import { clearFilteringWines } from "../redux/directory/directory.actions";

const useStyles = makeStyles((theme) => ({
  background: {
    background: theme.palette.backgroundUser,
  },
}));

const Navigation = ({ clearFilteringWines, loading }) => {
  const classes = useStyles();

  return (
    <Wrapper>
      <AppBar position="fixed" color="default">
        <div className="appBar">
          <Container>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Link to="/" onClick={() => clearFilteringWines()}>
                  <h1>
                    <Box color="neutral.main">E-vino</Box>
                  </h1>
                </Link>
              </Grid>
              <Box display="flex" flexDirection="row">
                <ProfileIcon />
                <CartIcon />
              </Box>
            </Grid>
          </Container>
          {loading && <LinearProgress />}
        </div>
      </AppBar>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoad,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  clearFilteringWines: () => dispatch(clearFilteringWines()),
});

const Wrapper = styled.section`
  h1 {
    margin-bottom: 0px;
  }
  img {
    margin: 0px;
  }
  .appBar {
    padding-top: 5px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
