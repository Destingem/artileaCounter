import { Icon } from "@iconify/react";
import { Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { nationalities } from "./nationalities";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import { setTeams } from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";

function AddTeam({ open, handleClose, title }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const [selectedNationality, setSelectedNationality] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  // show select state
  const [show, setShow] = React.useState(false);

  // add nationality from li
  const addNationalityHandler = (value) => {
    setValue("nationality", value);
    setSearch("");
    setShow(false);
  };

  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    const result = JSON.parse(await window.api.club.add(data));
    AddMessage(result, dispatch);

    if (!result.err) {
      const results = JSON.parse(await window.api.club.get());
      dispatch(setTeams(results.result));
      reset();
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
            {...register("organization")}
            label="organization"
          />

          <div data-style="select">
            <TextField
              size="small"
              label="nationality"
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
            {...register("nationality")}
            label="selected nationality"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ pointerEvents: "none" }}
          />
          <TextField size="small" {...register("phone")} label="phone" />
          <TextField size="small" {...register("email")} label="email" />
          <Button size="medium" variant="contained" type="submit">
            add
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AddTeam;
