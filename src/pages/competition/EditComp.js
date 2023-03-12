import { Icon } from "@iconify/react";
import { Button, Modal, TextField, FormLabel } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import { setCompitition } from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";
const { result } = require("./ResultObj");

function EditComp({ item, setItem, title }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const handleClose = () => {
    setItem(null);
  };
  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    if (data.startDate >= data.endDate) {
      let r = result(true, `check dates!`, "error");

      return AddMessage(JSON.parse(r), dispatch);
    }
    const results = JSON.parse(
      await window.api.compitition.edit({ data, _id: item._id })
    );
    AddMessage(results, dispatch);
    if (!results.err) {
      const resultss = JSON.parse(await window.api.compitition.get());
      dispatch(setCompitition(resultss.result));
      reset();
    }
  };

  React.useEffect(() => {
    setValue("name", item?.name);
    setValue("description", item?.description);
    setValue("startDate", item?.startDate);
    setValue("endDate", item?.endDate);
  });

  return (
    <Modal
      open={item ? true : false}
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

export default EditComp;
