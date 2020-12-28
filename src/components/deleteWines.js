import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteWinesStart } from "../redux/directory/directory.actions";

const deleteWines = ({ name, id, deleteWines }) => {
  const [open, setOpen] = useState(false);

  const deleteWine = () => {
    deleteWines(id);
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Opravdu chcete odstranit ${name}?`}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zrušit
          </Button>
          <Button onClick={deleteWine} color="secondary" autoFocus>
            Odstranit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteWines: id => dispatch(deleteWinesStart(id))
});

export default connect(null, mapDispatchToProps)(deleteWines);
