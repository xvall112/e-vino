import React, { useState } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ReplayIcon from "@material-ui/icons/Replay";
import Grid from "@material-ui/core/Grid";

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Filterinng = ({
  setFilteringWinesColor,
  setFilteringWinesDruh,
  winesDruhFiltering,
  winesColorFiltering,
  clearFilteringWines,
}) => {
  const classes = useStyles();

  const handleChangeColor = (event) => {
    setFilteringWinesColor(event.target.value);
  };
  const handleChangeDruh = (event) => {
    setFilteringWinesDruh(event.target.value);
  };

  return (
    <Box my={2} display="flex" alignItems="center">
      <FormControl variant="outlined" className={classes.formControl}>
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
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
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
      </FormControl>
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
