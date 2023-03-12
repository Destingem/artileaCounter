import { Icon } from "@iconify/react";
import { Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShooter,
  selectShootingrange,
  setCompitition,
  setShooter,
} from "../../../reducers/appSlice";
import { AddMessage } from "../../../reducers/message/AddMessage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddShootingRange({ open, handleClose, title, id }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const [shootingrange, setshootingrange] = React.useState();
  const dispatch = useDispatch();
  const shootingranges = useSelector(selectShootingrange);
  const [array, setArry] = React.useState(shootingranges);

  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    const result = JSON.parse(
      await window.api.compitition.addshootingRanges({
        data: shootingrange,
        _id: id,
      })
    );
    AddMessage(result, dispatch);

    const results = JSON.parse(await window.api.compitition.get());
    console.log(results);
    dispatch(setCompitition(results.result));
    reset();
  };
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.shootingrange.get());
      dispatch(setshootingrange(result.result));
      setArry(result.result);
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (shootingrange) setArry(shootingrange);
  }, [shootingrange]);

  const handleChange = (event) => {
    setshootingrange((prev)=> {return [...prev, event.target.value]} );
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
        <p data-style="title">{title}</p>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Shooting Range
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={shootingrange}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {array && array.map((el) => (
                <MenuItem value={el._id}>{el.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>

          <Button size="medium" variant="contained" onClick={onSubmitHandler}>
            add
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AddShootingRange;
