import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";

import style from "./style.module.scss";
import StaffREFTable from "./StaffREFTable";
import StaffOtherTable from "./StaffOtherTable";
import AddStuff from "./AddStuff";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../../reducers/appSlice";
import DeleteStafRef from "./DeleteStaff";
import Deleteoterhstaff from "./Deleteoterhstaff";
function Staff({ id }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const comp = useSelector(selectCompitition);
  const [array, setArray] = React.useState(
    comp.filter((el) => {
      return el._id === id;
    })
  );
  const [itemToDeleteREF, setItemToDeleteREF] = React.useState(null);
  const [itemToDeleteOther, setItemToDeleteOther] = React.useState(null);
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
    <div className={style.mainee}>
      <div style={{ height: "100%" }}>
        <div style={{ height: "150px" }}>
          <div data-style="search">
            <div>
              {array?.map((rows) =>
                rows.staff.director.map((el) => (
                  <p>Head Refree :{el.fname + " " + el.lname}</p>
                ))
              )}

              {array?.map((rows) =>
                rows.staff.headRefree.map((el) => (
                  <p>Director :{el.fname + " " + el.lname}</p>
                ))
              )}
            </div>
            <AddStuff
              handleClose={handleClose}
              open={open}
              title={"add shooter"}
              id={id}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleClose}
              startIcon={<Icon icon="material-symbols:add-circle-outline" />}
            >
              add Stuff
            </Button>
          </div>
        </div>

        <div data-style="main" className={style.index}>
          <div
            style={{
              height: "350px",
              maxHeight: "350px !important",
              overflow: "auto",
            }}
          >
            <StaffREFTable data={array} setItemToDelete={setItemToDeleteREF} />
          </div>
          <div
            style={{
              height: "350px",
              maxHeight: "350px !important",
              overflow: "auto",
            }}
          >
            <StaffOtherTable
              data={array}
              setItemToDelete={setItemToDeleteOther}
            />
          </div>
          <DeleteStafRef
            item={itemToDeleteREF}
            setItem={setItemToDeleteREF}
            id={id}
          />
          <Deleteoterhstaff
            item={itemToDeleteOther}
            setItem={setItemToDeleteOther}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}

export default Staff;
