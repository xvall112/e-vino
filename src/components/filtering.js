import React from "react";

import {
  makeStyles,
  withStyles,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@material-ui/core";

import ReplayIcon from "@material-ui/icons/Replay";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setFilteringWinesColor,
  setFilteringWinesDruh,
  clearFilteringWines,
} from "../redux/directory/directory.actions";
import {
  selectColorWine,
  selectDruhWine,
} from "../redux/directory/directory.selector";

const FormControlStyled = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1),
    minWidth: 120,
    "& .MuiFormLabel-root": { color: theme.palette.primary.main },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}))(FormControl);

const Filterinng = ({
  setFilteringWinesColor,
  setFilteringWinesDruh,
  winesDruhFiltering,
  winesColorFiltering,
  clearFilteringWines,
}) => {
  const handleChangeColor = (event) => {
    setFilteringWinesColor(event.target.value);
  };
  const handleChangeDruh = (event) => {
    setFilteringWinesDruh(event.target.value);
  };

  return (
    <Box my={2} display="flex" alignItems="center">
      <FormControlStyled variant="outlined" color="secondary">
        <InputLabel id="demo-simple-select-outlined-label">barva</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={winesColorFiltering}
          onChange={handleChangeColor}
          label="color"
        >
          <MenuItem value={""}>Vše</MenuItem>
          <MenuItem value={"bílé"}>Bílé</MenuItem>
          <MenuItem value={"červené"}>Červené</MenuItem>
          <MenuItem value={"růžové"}>Růžové</MenuItem>
        </Select>
      </FormControlStyled>
      <FormControlStyled variant="outlined" color="secondary">
        <InputLabel id="demo-simple-select-outlined-label">druh</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={winesDruhFiltering}
          onChange={handleChangeDruh}
          label="color"
        >
          <MenuItem value={""}>Vše</MenuItem>
          <MenuItem value={"suché"}>Suché</MenuItem>
          <MenuItem value={"sladké"}>Sladké</MenuItem>
          <MenuItem value={"polosuché"}>Polosuché</MenuItem>
          <MenuItem value={"polosladké"}>Polosladké</MenuItem>
        </Select>
      </FormControlStyled>
      <IconButton onClick={() => clearFilteringWines()}>
        <ReplayIcon />
      </IconButton>
    </Box>
  );
};
const mapStateToProps = createStructuredSelector({
  winesDruhFiltering: selectDruhWine,
  winesColorFiltering: selectColorWine,
});

const mapDispatchToProps = (dispatch) => ({
  setFilteringWinesColor: (color) => dispatch(setFilteringWinesColor(color)),
  setFilteringWinesDruh: (druh) => dispatch(setFilteringWinesDruh(druh)),
  clearFilteringWines: () => dispatch(clearFilteringWines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filterinng);
