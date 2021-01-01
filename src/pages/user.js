import React from "react";

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
