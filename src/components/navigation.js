import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CartIcon from "./cartIcon";
import ProfileIcon from "./profileIcon";

const Navigation = () => {
  return (
    <Wrapper>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Link to="/">
            <h1>E-vino</h1>
          </Link>
          <GridIcon>
            <ProfileIcon />
            <CartIcon />
          </GridIcon>
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    margin: 0px;
  }
`;
const SignIn = styled(Link)`
  background-color: hsla(0, 0%, 100%, 0.2);
  padding: 10px;
  border-radius: 30px;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.4);
  }
`;
const GridIcon = styled(Grid)`
  display: flex;
  flex-direction: row;
`;
export default Navigation;
