import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import TableContainer from "@mui/material/TableContainer";
import ShooterTable from "../Shooters/ShooterTable";
import style from "./style.module.scss";
import ShiftTable from "../Shifts/shiftTable";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../../reducers/appSlice";
import DeleteShooter from "../Shooters/DeleteShooter";
function OverView({ id }) {
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
      <div style={{ height: "100%" }}>
        <div data-style="search">
          <div data-style="add-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 600,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "200px",
                  justifyContent: "space-between",
                }}
              >
                <h4>Competition name: </h4>
                <p> {" " + array[0]?.name}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "250px",
                  justifyContent: "space-between",
                }}
              >
                <h4>Competition description: </h4>
                <p> {" " + array[0]?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "350px",
            maxHeight: "350px !important",
            overflow: "auto",
          }}
        >
          <ShooterTable
            data={array}
            setItemToDelete={setItemToDelete}
            setItemToEdit={setItemToEdit}
          />
        </div>
        <div
          style={{
            height: "250px",
            maxHeight: "250px !important",
            overflow: "auto",
          }}
        >
          <h3>Shifts</h3>
          <ShiftTable array={array} />
          <DeleteShooter
            item={itemToDelete}
            setItem={setItemToDelete}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}

export default OverView;
