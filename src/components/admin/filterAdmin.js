import React, { useState } from "react";

import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  sortAllOrdersBySelect,
  filterAllOrdersBySearch,
} from "../../redux/orders/orders.action";
import { createStructuredSelector } from "reselect";
import { sortOrdersBySelect } from "../../redux/orders/orders.selector";
import { connect } from "react-redux";

const FilterAdmin = ({
  sortBySelect,
  sortOrdersBySelect,
  filterAllOrdersBySearch,
}) => {
  const classes = useStyles();
  const setFilter = (event) => {
    sortBySelect(event.target.value);
  };
  const setSearch = (event) => {
    filterAllOrdersBySearch(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={setSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Grid>
        <Grid item>
          <StyledFormControl
            style={{ outline: "none" }}
            variant="outlined"
            size="small"
          >
            <InputLabel id="demo-simple-select-outlined-label">
              řadit podle
            </InputLabel>

            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sortOrdersBySelect}
              onChange={setFilter}
              label="řadit podle"
            >
              <MenuItem value={"name"}>Jména</MenuItem>
              <MenuItem value={"date"}>Data</MenuItem>
              <MenuItem value={"celkem"}>Celkem</MenuItem>
            </Select>
          </StyledFormControl>
        </Grid>
      </Grid>
    </div>
  );
};

const StyledFormControl = withStyles((theme) => ({
  root: {
    minWidth: 150,
    height: "auto",

    backgroundColor: fade(theme.palette.common.white, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: fade(theme.palette.common.white, 0.5),
      },
      "&:hover fieldset": {
        borderColor: fade(theme.palette.common.white, 0.5),
      },
      "&.Mui-focused fieldset": {
        borderColor: fade(theme.palette.common.white, 0.5),
      },
    },
  },
}))(FormControl);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    height: 45,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    zIndex: 1000,
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    "&:focus": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const mapStateToProps = createStructuredSelector({
  sortOrdersBySelect: sortOrdersBySelect,
});

const mapDispatchToProps = (dispatch) => ({
  sortBySelect: (select) => dispatch(sortAllOrdersBySelect(select)),
  filterAllOrdersBySearch: (search) =>
    dispatch(filterAllOrdersBySearch(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterAdmin);
