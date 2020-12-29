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

import { addWinesStart } from "../redux/directory/directory.actions";

const validationSchema = yup.object({
  name: yup.string("vyplňte název").required("vyplňte název"),
  price: yup
    .number("zadej cenu")
    .min(1, "cena musí být více než 1")
    .required("zadej cenu"),
  obsah: yup
    .number("zadej obsah")
    .min(0.1, "obsah musí být více než 0.1")
    .required("zadej obsah"),
  color: yup.string("zadej barvu").required("zadej barvu"),
  rocnik: yup
    .number("zadej ročník")
    .max(2021, "ročník musí být méně než aktuální rok")
    .required("zadej ročník"),
  druh: yup.string("zadej druh").required("zadej druh")
});

const AddWines = ({ addWines }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FwhiteWine.png?alt=media&token=228fcd0e-9cd9-40d9-b1ee-bf6c71256062"
  );

  const changeImg = () => {
    switch (formik.values.color) {
      case "bílé":
        setImg(
          "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FwhiteWine.png?alt=media&token=228fcd0e-9cd9-40d9-b1ee-bf6c71256062"
        );
        break;
      case "červené":
        setImg(
          "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FredWine.png?alt=media&token=17f66421-70ea-429d-9f85-09fbeca80aab"
        );
        break;
      case "růžové":
        setImg(
          "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FpinkWine.png?alt=media&token=84e087c2-fce9-4102-ac8a-ee29891ce59c"
        );
        break;
      default:
        setImg(
          "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FwhiteWine.png?alt=media&token=228fcd0e-9cd9-40d9-b1ee-bf6c71256062"
        );
    }
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
      color: "",
      rocnik: "",
      druh: ""
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      addWines({ values, image });
      formik.resetForm({});
    }
  });
  return (
    <Wrapper>
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
          <img
            style={{ height: "100px", margin: "0 auto" }}
            src={
              formik.values.color === "bílé"
                ? "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FwhiteWine.png?alt=media&token=228fcd0e-9cd9-40d9-b1ee-bf6c71256062"
                : formik.values.color === "červené"
                ? "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FredWine.png?alt=media&token=17f66421-70ea-429d-9f85-09fbeca80aab"
                : "https://firebasestorage.googleapis.com/v0/b/evino-30926.appspot.com/o/wine-bottle%2FpinkWine.png?alt=media&token=84e087c2-fce9-4102-ac8a-ee29891ce59c"
            }
          />
          <DialogContent>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="name"
              label="Název"
              type="text"
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
            <FormControl
              margin="dense"
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
            >
              <InputLabel id="color-label">Barva</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                value={formik.values.color}
                onChange={formik.handleChange("color")}
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
            <FormControl
              margin="dense"
              id="druh"
              fullWidth
              error={formik.touched.druh && Boolean(formik.errors.druh)}
            >
              <InputLabel id="druh-label">Druh</InputLabel>
              <Select
                labelId="druh-label"
                id="druh"
                value={formik.values.druh}
                onChange={formik.handleChange("druh")}
              >
                <MenuItem value={"suché"}>Suché</MenuItem>
                <MenuItem value={"sladké"}>Sladké</MenuItem>
                <MenuItem value={"polosuché"}>Polosuché</MenuItem>
              </Select>
            </FormControl>
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
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  addWines: ({ values, image }) => dispatch(addWinesStart({ values, image }))
});

const Wrapper = styled.div``;
export default connect(null, mapDispatchToProps)(AddWines);
