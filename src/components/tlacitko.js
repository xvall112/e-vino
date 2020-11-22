import React from "react";
import Button from "@material-ui/core/Button";

const Tlacitko = ({ children }) => {
  return (
    <div>
      <Button variant="contained" color="primary">
        {children}
      </Button>
    </div>
  );
};

export default Tlacitko;
