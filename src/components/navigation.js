import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartIcon from "../components/navigation/cartDropDown";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import LinearProgress from "@material-ui/core/LinearProgress";
import ProfileIcon from "./navigation/profileIcon";

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
                  <h1>E-vino</h1>
                </Link>
              </Grid>
              <GridIcon>
                <ProfileIcon />
                <CartIcon />
              </GridIcon>
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

const GridIcon = styled(Grid)`
  display: flex;
  flex-direction: row;
`;
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
