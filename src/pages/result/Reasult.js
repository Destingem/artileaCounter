import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import ResultTable from "./ResultTable";

import style from "./style.module.scss";

function Reasult() {
  return (
    <div data-style="main" className={style.index}>
      <div data-style="search">
        <TextField
          sx={{ marginRight: "20px" }}
          label="search compition"
          variant="outlined"
          size="small"
        />
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="search by month"
          type="month"
          size="small"
          variant="outlined"
        />

        <div data-style="add-section">
          <Button
            variant="contained"
            size="medium"
            startIcon={<Icon icon="material-symbols:add-circle-outline" />}
          >
            add compition
          </Button>
        </div>
      </div>

      <ResultTable />
    </div>
  );
}

export default Reasult;
