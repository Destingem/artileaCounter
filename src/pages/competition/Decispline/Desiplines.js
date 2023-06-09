import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import ShooterTable from "./DesiplinesTable";
import style from "./style.module.scss";
import ADdDesiplines from "./ADdDesiplines";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../../reducers/appSlice";
import DeleteShooter from "./DeleteDesiplines";
function Desiplines({ id }) {
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
        <div data-style="add-section">
          <ADdDesiplines
            handleClose={handleClose}
            open={open}
            title={"add Decisplines"}
            id={id}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleClose}
            startIcon={<Icon icon="material-symbols:add-circle-outline" />}
          >
            add descipline
          </Button>
        </div>
      </div>
      <ShooterTable
        data={array}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
      />
      <DeleteShooter item={itemToDelete} setItem={setItemToDelete} id={id} />
    </div>
  );
}

export default Desiplines;
