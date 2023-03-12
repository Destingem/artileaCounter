import { Icon } from "@iconify/react";
import { Button, Modal, TextField, Box, Switch } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setDiscipline } from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";
import style from "./style.module.scss";

function EditDiscipline({ title, item, setItem }) {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, setValue, watch } = useForm();
  const [checkedLimitShots, setCheckedLimitShots] = React.useState(false);
  const [pistol, setpistol] = React.useState(false);
  const [rifle, setrifle] = React.useState(false);
  const [crossbow, setcrossbow] = React.useState(false);
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
    };
    const result = JSON.parse(
      await window.api.discipline.edit({ dataz, _id: item._id })
    );
    AddMessage(result, dispatch);
    if (result.err) return;

    const places = JSON.parse(await window.api.discipline.get());
    dispatch(setDiscipline(places.result));
    reset();
  };
  React.useEffect(() => {
    setValue("name", item?.name);
    setValue("defedesion", item?.defedesion);
    setValue("other", item?.guns?.other);
    setValue("competitionShots", item?.shots?.competitionShots);
    setValue("isLimitedPreparation", item?.shots?.isLimitedPreparation);
    setValue("preparationLimit", item?.shots?.preparationLimit);
    setValue("maxShot", item?.shots?.maxShot);
    setValue("minShot", item?.shots?.minShot);
    setCheckedLimitShots(item?.shots?.isLimitedPreparation);
    setpistol(item?.guns?.pistol);
    setrifle(item?.guns?.rifle);
    setcrossbow(item?.guns?.crossbow);
  }, [
    item?.defedesion,
    item?.name,
    item?.shots?.competitionShots,
    item?.shots?.isLimitedPreparation,
    item?.shots?.maxShot,
    item?.shots?.minShot,
    item?.shots?.preparationLimit,
    setValue,
  ]);

  /*
    const data=()=>{
      setCheckedLimitShots(item?.shots?.isLimitedPreparation)
              setpistol(item?.guns?.pistol)
        setrifle(item?.guns?.rifle)
        setcrossbow(item?.guns?.crossbow)
    }
    data();

*/
  const handleClose = () => {
    setItem(null);
  };
  // change the checkbox value with the li tag
  const changeValue = (target) => {
    setValue(target, !watch(target));
  };

  return (
    <Modal
      open={item}
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

const Pistoles = ({ register, display, changeValue }) => {
  return (
    <ul style={{ display: display ? "block" : "none" }}>
      <li onClick={() => changeValue("VzPi")}>
        <span>VzPi</span>
        <input type="checkbox" {...register("VzPi")} />
      </li>
      <li onClick={() => changeValue("RP")}>
        <span>RP</span>
        <input type="checkbox" {...register("RP")} />
      </li>
      <li onClick={() => changeValue("VP")}>
        <span>VP</span>
        <input type="checkbox" {...register("VP")} />
      </li>
      <li onClick={() => changeValue("SP")}>
        <span>SP</span>
        <input type="checkbox" {...register("SP")} />
      </li>
      <li onClick={() => changeValue("LP")}>
        <span>LP</span>
        <input type="checkbox" {...register("LP")} />
      </li>
      <li onClick={() => changeValue("SVP")}>
        <span>SVP</span>
        <input type="checkbox" {...register("SVP")} />
      </li>
    </ul>
  );
};

const Rifle = ({ register, display, changeValue }) => {
  return (
    <ul style={{ display: display ? "block" : "none" }}>
      <li onClick={() => changeValue("VzPu")}>
        <span>VzPu</span>
        <input type="checkbox" {...register("VzPu")} />
      </li>
      <li onClick={() => changeValue("SM60")}>
        <span>SM60</span>
        <input type="checkbox" {...register("SM60")} />
      </li>
      <li onClick={() => changeValue("VT")}>
        <span>VT</span>
        <input type="checkbox" {...register("VT")} />
      </li>
      <li onClick={() => changeValue("RT")}>
        <span>RT</span>
        <input type="checkbox" {...register("RT")} />
      </li>
    </ul>
  );
};

const Type = ({ register, display, changeValue }) => {
  return (
    <ul style={{ display: display ? "block" : "none" }}>
      <li onClick={() => changeValue("electronic")}>
        <span>electronic</span>
        <input type="checkbox" {...register("electronic")} />
      </li>
      <li onClick={() => changeValue("pritah")}>
        <span>pritah</span>
        <input type="checkbox" {...register("pritah")} />
      </li>
      <li onClick={() => changeValue("posuv")}>
        <span>posuv</span>
        <input type="checkbox" {...register("posuv")} />
      </li>
    </ul>
  );
};

export default EditDiscipline;
