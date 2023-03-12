import { Icon } from "@iconify/react";
import { Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDiscipline,
  selectShooter,
  setCompitition,
  setDiscipline,
  setShooter,
} from "../../../reducers/appSlice";
import { AddMessage } from "../../../reducers/message/AddMessage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ADdDesiplines({ open, handleClose, title, id }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const [ADdDesiplines, setADdDesiplines] = React.useState();
  const dispatch = useDispatch();
  const Decispline = useSelector(selectDiscipline);
  const [array, setArry] = React.useState(Decispline);
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.discipline.get());
      dispatch(setDiscipline(result.result));
      console.log(result);
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (Decispline) setArry(Decispline);
  }, [Decispline]);

  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    const result = JSON.parse(
      await window.api.compitition.adddisciplines({
        data: ADdDesiplines,
        _id: id,
      })
    );
    AddMessage(result, dispatch);
    const items = JSON.parse(await window.api.compitition.get());
    // if (items.err) return addMessage(items, dispatch);
    dispatch(setCompitition(items.result));
  };

  const handleChange = (event) => {
    setADdDesiplines(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div id="is" className={style.modal}>
        <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
        <p data-style="title">Add Decisplines</p>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Desiplines
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={ADdDesiplines}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {array.map((el) => (
                <MenuItem value={el._id}>{el.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button size="medium" variant="contained" onClick={onSubmitHandler}>
            add
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default ADdDesiplines;
