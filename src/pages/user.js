import React from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import UserTabPane from "../components/users/userTabPane";
import UserHeader from "../components/users/usersHeader";

const User = () => {
  return (
    <div>
      <UserHeader />
      <UserTabPane />
    </div>
  );
};

export default User;
