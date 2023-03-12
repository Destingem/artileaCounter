import { Icon } from "@iconify/react";
import { Button, Modal, TextField, FormLabel } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";

import { setCompitition } from "../../reducers/appSlice";
import { useSelector } from "react-redux";
import { selectShooter } from "../../reducers/appSlice";

import { AddMessage } from "../../reducers/message/AddMessage";

const { result } = require("./ResultObj");
function AddCompetition({ open, handleClose, title }) {
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
    if (data.startDate >= data.endDate) {
      let r = result(true, `check dates!`, "error");

      return AddMessage(JSON.parse(r), dispatch);
    }

    const results = JSON.parse(await window.api.compitition.add(data));
    AddMessage(results, dispatch);
    if (!results.err) {
      const resultss = JSON.parse(await window.api.compitition.get());
      dispatch(setCompitition(resultss.result));
      reset();
    }
  };
  React.useEffect(() => {
    const getData = async () => {
      const results = JSON.parse(await window.api.compitition.get());
      dispatch(setCompitition(results.result));
    };
    getData();
  }, [dispatch]);
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
            {...register("description")}
            label="description"
          />
          <div>
            <FormLabel about="startdate">Start Date</FormLabel> <br />
            <TextField
              size="small"
              style={{ width: "250px" }}
              {...register("startDate")}
              type={"date"}
            />
          </div>

          <div>
            <FormLabel about="endDate">End Date</FormLabel> <br />
            <TextField
              style={{ width: "250px" }}
              size="small"
              {...register("endDate")}
              type={"date"}
            />
          </div>
          <Button size="medium" variant="contained" type="submit">
            add
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AddCompetition;
