import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import ShiftTable from "./shiftTable";
import style from "./style.module.scss";
import { Toolbar } from "@mui/material";
import AddShift from "./AddShift";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../../reducers/appSlice";

function Shifts({ id }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const comp = useSelector(selectCompitition);
  const [array, setArray] = React.useState(
    comp.filter((el) => {
      return el._id === id;
    })
  );
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [itemToEdit, setItemToEdit] = React.useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.compitition.get());
      dispatch(setCompitition(result.result));
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (comp)
      setArray(
        comp.filter((el) => {
          return el._id === id;
        })
      );
  }, [comp, id]);
  return (
    <div data-style="main" className={style.index}>
      <div data-style="search">
        <AddShift
          handleClose={handleClose}
          open={open}
          title={"add Shift"}
          id={id}
          array={array}
        />

        <div data-style="add-section">
          <Button
            variant="contained"
            size="small"
            onClick={handleClose}
            startIcon={<Icon icon="material-symbols:add-circle-outline" />}
          >
            add Shift
          </Button>
        </div>
      </div>
      <Toolbar
        sx={{
          backgroundColor: "var(--orange-cl)",
          color: "var(--light-cl)",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
          gap: 1,
          marginBottom: "10px",
        }}
      >
        <p>Shifts table</p>
      </Toolbar>
      <ShiftTable array={array} />
    </div>
  );
}

export default Shifts;
