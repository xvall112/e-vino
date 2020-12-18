import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import LinearProgress from "@material-ui/core/LinearProgress";

import CartIcon from "./cartIcon";
import ProfileIcon from "./profileIcon";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";
/* import { selectIsWinesFetching } from "../redux/directory/directory.selector"; */
import { selectLoad } from "../redux/loading/loading.selector";

const Navigation = ({currentUser, loading}) => {
  console.log(currentUser);
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
                <Link to="/">
                  <h1>E-vino</h1>
                </Link>
              </Grid>
              <GridIcon>

                {currentUser ? (currentUser.id === "1Zh2hy3lMLfMdy8BVWCvRFum79t1" ? <Link to="/admin">admin</Link> : null):null}
               
                <ProfileIcon />
                <CartIcon />
              </GridIcon>
            </Grid>
          </Container>
          {loading.loading && <LinearProgress />}
        </div>
      </AppBar>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoad,
  currentUser: selectCurrentUser
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
export default connect(mapStateToProps)(Navigation);
