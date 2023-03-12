import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import ResultsTable from "./ResultsTable";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../../reducers/appSlice";

function Results({id}) {
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
      <ResultsTable
        data={array}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
      />
    </div>
  );
}

export default Results;
