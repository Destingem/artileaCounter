import { Button, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";

function Search({ handleClose }) {
  return (
    <div data-style="search">
      <TextField
        sx={{ marginRight: "20px" }}
        label="search shooter"
        variant="outlined"
        size="small"
      />

      <Button
        variant="contained"
        size="medium"
        startIcon={<Icon icon="material-symbols:add-circle-outline" />}
        onClick={handleClose}
      >
        add shooter
      </Button>
    </div>
  );
}

export default Search;
