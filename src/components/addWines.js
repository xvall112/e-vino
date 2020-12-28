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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";

import { resetPasswordStart } from "../redux/user/user.actions";
const validationSchema = yup.object({
  email: yup
    .string("Vložte email")
    .email("špatný tvar emailu")
    .required("Email není vyplňen")
});

const AddWines = ({ resetPasswordStart }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("bílé");

  const handleChange = event => {
    setColor(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      obsah: "",
      color: color,
      rocnik: "",
      druh: ""
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      formik.resetForm({});
    }
  });
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {" "}
        <div className="addWine">Přidat</div>
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Přidat víno</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="name"
              label="Název"
              type="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              variant="outlined"
              margin="dense"
              id="price"
              label="Cena"
              type="number"
              fullWidth
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              variant="outlined"
              margin="dense"
              id="obsah"
              label="Obsah"
              type="number"
              fullWidth
              value={formik.values.obsah}
              onChange={formik.handleChange}
              error={formik.touched.obsah && Boolean(formik.errors.obsah)}
              helperText={formik.touched.obsah && formik.errors.obsah}
            />
            <FormControl variant="outlined" margin="dense">
              <InputLabel id="color">Barva</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="color"
                value={color}
                onChange={handleChange}
              >
                <MenuItem value={"bílé"}>Bílé</MenuItem>
                <MenuItem value={"červené"}>Červené</MenuItem>
                <MenuItem value={"růžové"}>Růžové</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="dense"
              id="rocnik"
              label="Ročník"
              type="number"
              fullWidth
              value={formik.values.rocnik}
              onChange={formik.handleChange}
              error={formik.touched.rocnik && Boolean(formik.errors.rocnik)}
              helperText={formik.touched.rocnik && formik.errors.rocnik}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Zrušit
            </Button>
            <Button type="submit" color="primary">
              Přidat
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

export default connect(null, mapDispatchToProps)(AddWines);
