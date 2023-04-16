import { Icon } from "@iconify/react";
import { Button, Modal, TextField, Select, MenuItem } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShootingrange } from "../../reducers/appSlice";
import { nationalities } from "./nationalities";
import { AddMessage } from "../../reducers/message/AddMessage";

function EditShootingRange({ item, setItem, title }) {
  const dispatch = useDispatch();

  const { register, reset, handleSubmit, setValue } = useForm();
  const [search, setSearch] = React.useState("");
  const handleClose = () => {
    setItem(null);
  };

  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    console.log(data);
    const result = JSON.parse(
      await window.api.shootingrange.edit({ data, _id: item._id })
    );
    AddMessage(result, dispatch);
    if (!result.err) {
      const results = JSON.parse(await window.api.shootingrange.get());
      dispatch(setShootingrange(results.result));
      reset();
    }
  };
  // search handler

  const flag = item;

  React.useEffect(() => {
    console.log("here");
    setValue("name", item?.name);
    setValue("address", item?.address);
    setValue("city", item?.city);
    setValue("postalCode", item?.postalCode);
    setValue("country", item?.country);
    setValue("phone", item?.phone);
    setValue("email", item?.email);
    setValue("web", item?.web);
    setValue("description", item?.description);
    setValue("country", item?.country);
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
          <TextField size="small" {...register("name")} label="Název střelnice" />
          <TextField
            size="small"
            {...register("provozovatel")}
            label="Provozovatel"
          />
          <TextField size="small" {...register("staff")} label="Město" />
          <Button size="medium" variant="contained" type="submit">
            Upravit střelnici
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default EditShootingRange;
