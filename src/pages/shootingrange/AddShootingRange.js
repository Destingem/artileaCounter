import { Icon } from "@iconify/react";
import { Button, Modal, TextField, Select, MenuItem } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { setShootingrange } from "../../reducers/appSlice";
import { useSelector } from "react-redux";
import { selectShooter, setShooter, resetTeams } from "../../reducers/appSlice";

import { AddMessage } from "../../reducers/message/AddMessage";

function AddShootingRange({ open, handleClose, title }) {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, setValue } = useForm();
  const shooters = useSelector(selectShooter);
  const [array, setArray] = React.useState(shooters);
  const [user, setUser] = React.useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
    setValue("responsiblePerson", event.target.value);
  };

  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    let datas = {
      name: data.name,
      provozovatel: data.provozovatel,
      staff: {
        responsiblePerson: data.responsiblePerson,
      },
    };

    const result = JSON.parse(await window.api.shootingrange.add(datas));
    AddMessage(result, dispatch);
    if (!result.err) {
      const results = JSON.parse(await window.api.shootingrange.get());
      dispatch(setShootingrange(results.result));
      reset();
    }
  };
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.people.get());
      dispatch(setShooter(result.result));
    };
    getData();
  }, [dispatch]);
  React.useEffect(() => {
    if (shooters) setArray(shooters);
  }, [shooters]);

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
          <TextField size="small" {...register("name")} label="name" />
          <TextField
            size="small"
            {...register("provozovatel")}
            label="provozovatel"
          />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Responsible Person
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={user}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {array.map((ar) => (
                <MenuItem value={ar._id} key={ar._id}>
                  {ar.fname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button size="medium" variant="contained" type="submit">
            add
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AddShootingRange;
