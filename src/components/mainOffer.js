import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./item";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDirectoryWine,
  selectIsWinesFetching
} from "../redux/directory/directory.selector";
import { selectCurrentUser } from "../redux/user/user.selector";
import { fetchWinesStart } from "../redux/directory/directory.actions";

/* import CollectionsContext from "../contexts/collections/collections.context"; */

import Container from "@material-ui/core/Container";

const MainOffer = ({ wines, fetchWinesStart,currentUser }) => {
  /* const collections = useContext(CollectionsContext); */

  useEffect(() => {
    fetchWinesStart();
  }, []);
  return (
    <Wrapper>
      <Container>
      

        <Grid container justify="center" alignItems="center" spacing={2}>
          {wines.map(item => {
            return <Item item={item} key={item.id} />;
          })}
            {currentUser ? (currentUser.id === "1Zh2hy3lMLfMdy8BVWCvRFum79t1" ? (<Grid item xs={6} md={4} lg={3}>
           <Button variant="contained"> <div className='addWine'>
             Pridat
             </div></Button>
          
           </Grid>) : null):null}
      
           
          
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  text-align: center;
  .addWine{
    height: 100%;
    width:100%;
  }
`;

const mapStateToProps = createStructuredSelector({
  wines: selectDirectoryWine,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchWinesStart: () => dispatch(fetchWinesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainOffer);
