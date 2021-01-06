import React from "react";

import UserTabPane from "../components/users/userTabPane";
import UserHeader from "../components/users/usersHeader";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: blueGrey[50],
    minHeight: "90vh",
  },
}));

const User = () => {
  const classes = useStyles();
  return (
    <Slide direction="right" in={true}>
      <div className={classes.root}>
        <UserHeader />
        <UserTabPane />
      </div>
    </Slide>
  );
};

export default User;
