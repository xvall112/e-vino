import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { createStructuredSelector } from "reselect";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { resetPasswordStart } from "../redux/user/user.actions";
const validationSchema = yup.object({
  email: yup
    .string("Vložte email")
    .email("špatný tvar emailu")
    .required("Email není vyplňen")
});

const ForgetPassword = ({ resetPasswordStart }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      resetPasswordStart(values.email);
      formik.resetForm({});
    }
  });
  return (
    <div>
      <span className="forgotPassword" onClick={handleClickOpen}>
        Zapomněl jsi heslo?
      </span>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Resetování hesla</DialogTitle>
          <DialogContent>
            <DialogContentText>Zadejte email pro reset hesla</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Odeslat
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  resetPasswordStart: email => dispatch(resetPasswordStart(email))
});

export default connect(null, mapDispatchToProps)(ForgetPassword);
