import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import CategoriesTable from "./CategoriesTable";
import style from "./style.module.scss";

function Categories() {
  return (
    <div data-style="main" className={style.index}>
      <div data-style="search">
        <TextField
          sx={{ marginRight: "20px" }}
          label="search compition"
          variant="outlined"
          size="small"
        />

        <Button
          variant="contained"
          size="medium"
          startIcon={<Icon icon="material-symbols:add-circle-outline" />}
        >
          add category
        </Button>
      </div>

      <CategoriesTable />
    </div>
  );
}

export default Categories;
