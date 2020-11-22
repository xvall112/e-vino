import React from "react";
import styled from "styled-components";
import Item from "./item";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectoryWine } from "../redux/directory/directory.selector";

/* import CollectionsContext from "../contexts/collections/collections.context"; */

import Container from "@material-ui/core/Container";

const MainOffer = ({ wine }) => {
  /* const collections = useContext(CollectionsContext); */

  return (
    <Wrapper>
      <Container>
        <h1>Main Offer</h1>
        <Grid container justify="center" alignItems="center" spacing={5}>
          {wine.map(item => {
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
  wine: selectDirectoryWine
});
export default connect(mapStateToProps)(MainOffer);
