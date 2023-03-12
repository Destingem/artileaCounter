import { Icon } from "@iconify/react";
import { Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { nationalities } from "./nationalities";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import { resetTeams, setTeams } from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";

function EditTeam({ title, item, setItem }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const [selectedNationality, setSelectedNationality] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  // show select state
  const [show, setShow] = React.useState(false);

  // add nationality from li
  const addNationalityHandler = (value) => {
    setValue("country", value);
    setSearch("");
    setShow(false);
  };
  React.useEffect(() => {
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
  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    const result = JSON.parse(
      await window.api.team.edit({ data, _id: item._id })
    );
    AddMessage(result, dispatch);
    if (!result.err) {
      const items = JSON.parse(await window.api.team.get());
      // if (items.err) return addMessage(items, dispatch);
      dispatch(resetTeams());
      dispatch(setTeams(items.result));
      setItem(null);
    }
  };

  // search handler
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    setSelectedNationality(
      nationalities.filter((val) =>
        val.Nationality.toUpperCase().includes(search.toUpperCase())
      )
    );
  }, [search]);
  const handleClose = () => {
    setItem(null);
  };
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
          <TextField size="small" {...register("address")} label="address" />
          <TextField size="small" {...register("city")} label="city" />
          <TextField
            size="small"
            {...register("postalCode")}
            label="postalCode"
          />

          <div data-style="select">
            <TextField
              size="small"
              label="country"
              onChange={searchHandler}
              value={search}
              onFocus={() => setShow(true)}
              onBlur={() =>
                document.addEventListener("mouseup", function func(e) {
                  if (e.target.tagName !== "LI") setShow(false);
                  document.removeEventListener("mouseup", func);
                })
              }
            />
            <ul data-show={`${show}`}>
              {selectedNationality.map((val, i) => (
                <li
                  onClick={() => addNationalityHandler(val.Nationality)}
                  key={`nat-${i}`}
                >
                  {val.Nationality}
                </li>
              ))}
            </ul>
          </div>

          <TextField
            size="small"
            {...register("country")}
            label="selected country"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ pointerEvents: "none" }}
          />

          <TextField size="small" {...register("phone")} label="phone" />
          <TextField size="small" {...register("email")} label="email" />
          <TextField size="small" {...register("web")} label="web" />
          <TextField
            size="small"
            {...register("description")}
            label="description"
          />
          <Button size="medium" variant="contained" type="submit">
            save
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default EditTeam;
