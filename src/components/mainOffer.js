import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./item";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDirectoryWine,
  selectIsWinesFetching
} from "../redux/directory/directory.selector";
import { fetchWinesStart } from "../redux/directory/directory.actions";

/* import CollectionsContext from "../contexts/collections/collections.context"; */

import Container from "@material-ui/core/Container";

const MainOffer = ({ wines, fetchWinesStart }) => {
  /* const collections = useContext(CollectionsContext); */

  useEffect(() => {
    fetchWinesStart();
  }, []);
  return (
    <Wrapper>
      <Container>
        <h1>Main Offer</h1>

        <Grid container justify="center" alignItems="center" spacing={5}>
          {wines.map(item => {
            return <Item item={item} key={item.id} />;
          })}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  text-align: center;
`;

const mapStateToProps = createStructuredSelector({
  wines: selectDirectoryWine
});

const mapDispatchToProps = dispatch => ({
  fetchWinesStart: () => dispatch(fetchWinesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainOffer);
