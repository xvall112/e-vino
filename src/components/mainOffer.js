import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Item from "./item";
import Filtering from "./filtering";
import AddWines from "./addWines";

import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectoryWine } from "../redux/directory/directory.selector";
import { selectCurrentUser } from "../redux/user/user.selector";
import { fetchWinesStart } from "../redux/directory/directory.actions";

const MainOffer = ({ wines, fetchWinesStart, currentUser }) => {
  useEffect(() => {
    fetchWinesStart();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Filtering />

        <Grid container alignItems="center" spacing={2}>
          {wines.map((item) => {
            return <Item item={item} key={item.id} />;
          })}

          {currentUser ? (
            currentUser.id === process.env.REACT_APP_ADMIN_ID ? (
              <Grid item xs={6} md={4} lg={3}>
                <AddWines />
              </Grid>
            ) : null
          ) : null}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .addWine {
    height: 100%;
    width: 100%;
  }
`;

const mapStateToProps = createStructuredSelector({
  wines: selectDirectoryWine,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWinesStart: () => dispatch(fetchWinesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainOffer);
