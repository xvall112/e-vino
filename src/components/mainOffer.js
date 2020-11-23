import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./item";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectoryWine } from "../redux/directory/directory.selector";
import {
  updateDirectory,
  setLoading
} from "../redux/directory/directory.actions";

import {
  firestore,
  convertWinesSnapshotToMap
} from "../firebase/firebase.utils";

/* import CollectionsContext from "../contexts/collections/collections.context"; */

import Container from "@material-ui/core/Container";

const MainOffer = ({ wines, updateWines, setLoading }) => {
  /* const collections = useContext(CollectionsContext); */

  useEffect(() => {
    setLoading(true);
    const winesRef = firestore.collection("wines");
    winesRef.onSnapshot(async snapshot => {
      const winesMap = convertWinesSnapshotToMap(snapshot);
      updateWines(winesMap);
      setLoading(false);
    });
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
  updateWines: winesMap => dispatch(updateDirectory(winesMap)),
  setLoading: bool => dispatch(setLoading(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainOffer);
