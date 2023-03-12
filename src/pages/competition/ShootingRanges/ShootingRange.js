import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import ShootingRangeTables from "./ShootingRangeTable";
import style from "./style.module.scss";
import AddShootingRange from "./AddShootingRange";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../../reducers/appSlice";
import DeleteShootingRange from "./deleteShootingRange";

function ShootingRange({ id }) {
  const dispatch = useDispatch();
  const comp = useSelector(selectCompitition);
  const [array, setArray] = React.useState(comp);
  const [open, setOpen] = React.useState(false);
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
      <div className={style.mainee}>
        <div data-style="search">
          <AddShootingRange
            handleClose={handleClose}
            open={open}
            title={"add ShootingRange"}
            id={id}
          />

          <div data-style="add-section">
            <Button
              variant="contained"
              size="small"
              onClick={handleClose}
              startIcon={<Icon icon="material-symbols:add-circle-outline" />}
            >
              add Shooting Range
            </Button>
          </div>
        </div>
        <ShootingRangeTables data={array} setItemToDelete={setItemToDelete} />
        <DeleteShootingRange
          item={itemToDelete}
          setItem={setItemToDelete}
          id={id}
        />
      </div>
    </div>
  );
}

export default ShootingRange;
