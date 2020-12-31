import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const usersHeader = ({ currentUser }) => {
  return (
    <Wrapper>
      <Box bgcolor="primary.main">
        <Container>
          <Box py={3}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Avatar src={currentUser.photoURL} />
              <Box color="white" fontWeight={900} pl={2}>
                {currentUser.displayName}
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const Wrapper = styled.div`
  img {
    margin: 0px;
  }
`;

export default connect(mapStateToProps)(usersHeader);
