import { Icon } from "@iconify/react";
import { Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { nationalities } from "./nationalities";
import style from "./style.module.scss";
import { setTeams } from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { selectShooter, setShooter, resetTeams } from "../../reducers/appSlice";

function AddTeamMember({ title, item, setItem }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const shooters = useSelector(selectShooter);
  const [array, setArray] = React.useState(shooters);

  const [user, setUser] = React.useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
    setValue("people", event.target.value);
  };
  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    let datas = {
      id: item._id,
      team: data.people,
    };
    const result = JSON.parse(await window.api.club.addmember(datas));
    AddMessage(result, dispatch);
    if (!result.err) {
      const items = JSON.parse(await window.api.club.get());
      // if (items.err) return addMessage(items, dispatch);
      dispatch(resetTeams());
      dispatch(setTeams(items.result));
      setItem(null);
    }
  };

  const handleClose = () => {
    setItem(null);
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
      open={item ? true : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div id="is" className={style.modal}>
        <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
        <p data-style="title">{title}</p>

        <form
          style={{ gridTemplateColumns: "1fr" }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-filled-label">Member</InputLabel>
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

export default AddTeamMember;
