import React from "react";
import AdminHeader from "../components/admin/adminHeader";
import AdminTabPane from "../components/admin/adminTabPane";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: blueGrey[50],
    minHeight: "90vh",
  },
}));

const Admin = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AdminHeader />
      <AdminTabPane />
    </div>
  );
};

export default Admin;
