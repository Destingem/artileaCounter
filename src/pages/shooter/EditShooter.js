import { Icon } from "@iconify/react";
import { Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { nationalities } from "./nationalities";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTeams,
  setTeams,
  selectPlaces,
  setPlaces,
  setShooter,
} from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";

function EditShooter({ item, setItem, title }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const [selectedNationality, setSelectedNationality] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const dispatch = useDispatch();
  const shooters = useSelector(selectTeams);

  // drop list state
  // show select state
  const [show, setShow] = React.useState(false);

  // add nationality from li
  const addNationalityHandler = (value) => {
    setValue("nationality", value);
    setSearch("");
    setShow(false);
  };
  const handleClose = () => {
    setItem(null);
  };
  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    let datas = {
      fname: data.fname,
      lname: data.lname,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      phone: data.phone,
      email: data.email,
      Identificators: {
        firearmLicence: data.firearmLicence,
        refreeLincense: data.refreeLincense,
        trainerLicense: data.trainerLicense,
      },
    };
    const result = JSON.parse(
      await window.api.people.edit({ datas, _id: item._id })
    );
    AddMessage(result, dispatch);
    if (!result.err) {
      const results = JSON.parse(await window.api.people.get());
      dispatch(setShooter(results.result));
      reset();
    }
  };

  React.useEffect(() => {
    setValue("fname", item?.fname);
    setValue("lname", item?.lname);
    setValue("dateOfBirth", item?.dateOfBirth);
    setValue("nationality", item?.nationality);
    setValue("phone", item?.phone);
    setValue("email", item?.email);
    setValue("firearmLicence", item?.firearmLicence);
    setValue("refreeLincense", item?.refreeLincense);
    setValue("trainerLicense", item?.trainerLicense);
  });
  // search handler
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    console.log(search);
    setSelectedNationality(
      nationalities.filter((val) =>
        val.Nationality.toUpperCase().includes(search.toUpperCase())
      )
    );
  }, [search]);

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
          <TextField size="small" {...register("fname")} label="first name" />
          <TextField size="small" {...register("lname")} label="last name" />
          <TextField
            size="small"
            {...register("dateOfBirth")}
            label="date of birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField size="small" {...register("email")} label="email" />
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
          <TextField
            size="small"
            {...register("firearmLicence")}
            label="firearmLicence"
          />
          <TextField
            size="small"
            {...register("refreeLincense")}
            label="refreeLincense"
          />
          <TextField
            size="small"
            {...register("trainerLicense")}
            label="trainerLicense"
          />

          <Button size="medium" variant="contained" type="submit">
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default EditShooter;
