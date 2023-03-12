import { Icon } from "@iconify/react";
import { Button, Modal, TextField, Box, Switch } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setDiscipline } from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";
import style from "./style.module.scss";

function AddDiscipline({ open, handleClose, title }) {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, setValue, watch } = useForm();
  const [checkedLimitShots, setCheckedLimitShots] = React.useState(false);
  const [pistol, setpistol] = React.useState(false);
  const [rifle, setrifle] = React.useState(false);
  const [crossbow, setcrossbow] = React.useState(false);

  // submit handler to get data from the form using useForm
  const onSubmitHandler = async (data) => {
    let dataz = {
      name: data.name,
      defedesion: data.defedesion,
      guns: {
        pistol: pistol,
        rifle: rifle,
        crossbow: crossbow,
        other: data.gunsOther,
      },
      shots: {
        competitionShots: data.competitionShots,
        isLimitedPreparation: checkedLimitShots,
        preparationLimit: data.preparationLimit,
        maxShot: data.maxShot,
        minShot: data.minShot,
      },
      time: {
        onRegular: null,
        onElectronic: null,
        onMigratory: null,
        other: [],
      },
    };
    const result = JSON.parse(await window.api.discipline.add(dataz));
    AddMessage(result, dispatch);
    if (result.err) return;

    const discipline = JSON.parse(await window.api.discipline.get());
    dispatch(setDiscipline(discipline.result));
    reset();
  };

  // change the checkbox value with the li tag

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
          <TextField
            size="small"
            {...register("name", {
              required: true,
            })}
            label="name"
          />
          <TextField
            size="small"
            {...register("defedesion", {
              required: true,
            })}
            label="defedesion"
          />

          <p data-style="separator">Shots :</p>

          <TextField
            size="small"
            {...register("competitionShots", {
              required: true,
            })}
            type="number"
            label="competitionShots"
          />
          <div></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "150px" }}>is Limited Preparation:</label>
            <Box>
              <Switch
                checked={checkedLimitShots}
                onChange={(event) => setCheckedLimitShots(event.target.checked)}
              />
            </Box>
          </div>
          <TextField
            size="small"
            {...register("preparationLimit")}
            type="number"
            disabled={!checkedLimitShots}
            label="preparation Limit"
          />
          <TextField
            size="small"
            type="number"
            {...register("maxShot", {
              required: true,
            })}
            label="max Shots"
          />
          <TextField
            size="small"
            {...register("minShot", {
              required: true,
            })}
            type="number"
            label="min Shots"
          />

          <p data-style="separator">guns :</p>

          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "150px" }}>pistol :</label>
            <Box>
              <Switch
                checked={pistol}
                onChange={(event) => setpistol(event.target.checked)}
              />
            </Box>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "150px" }}>rifle :</label>
            <Box>
              <Switch
                checked={rifle}
                onChange={(event) => setrifle(event.target.checked)}
              />
            </Box>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "150px" }}>crossbow :</label>
            <Box>
              <Switch
                checked={crossbow}
                onChange={(event) => setcrossbow(event.target.checked)}
              />
            </Box>
          </div>
          <TextField
            size="small"
            {...register("gunsOther")}
            label="gunsOther"
          />

          <Button size="medium" variant="contained" type="submit">
            add
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AddDiscipline;
/*


*/
