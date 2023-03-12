import { Icon } from "@iconify/react";
import { Button, Modal, TextField, Box, Switch } from "@mui/material";

import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import {
  resetShootingrange,
  setDiscipline,
  setShootingrange,
  setTeams,
} from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { selectShooter, setShooter, resetTeams } from "../../reducers/appSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AddStuff({ title, item, setItem }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const shooters = useSelector(selectShooter);
  const [array, setArray] = React.useState(shooters);

  const [user, setUser] = React.useState("");
  const [value, setValues] = React.useState(0);

  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  const handleChange = (event) => {
    setUser(event.target.value);
    setValue("people", event.target.value);
  };
  // submit handler to get data from the form using useForm

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
      <div>
        <div id="is" className={style.modal}>
          <Box sx={{ bgcolor: "white" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChanges}
                aria-label="basic tabs example"
              >
                <Tab label="Add Final" {...a11yProps(0)} />
                <Tab label="Add onRegular Time" {...a11yProps(1)} />
                <Tab label="add onElectronic Time" {...a11yProps(2)} />
                <Tab label="add onMigratory Time" {...a11yProps(3)} />
                <Tab label="add other Time" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ADDFINAL
                item={item}
                handleClose={handleClose}
                setItem={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OnRegular
                item={item}
                arrayPlaces={array}
                handleClose={handleClose}
                title={"Add Range Manager"}
                setItem={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OnElectronic
                item={item}
                arrayPlaces={array}
                handleClose={handleClose}
                title={"Add Other"}
                setItem={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <OnMigratory
                item={item}
                arrayPlaces={array}
                handleClose={handleClose}
                title={"Add Other"}
                setItem={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Onother
                item={item}
                arrayPlaces={array}
                handleClose={handleClose}
                title={"Add Other"}
                setItem={setItem}
              />
            </TabPanel>
          </Box>
        </div>
      </div>
    </Modal>
  );
}

const ADDFINAL = ({ handleClose, item, setItem }) => {
  const [user, setUser] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [doesHaveFinal, setdoesHaveFinal] = React.useState(false);
  const [name, setname] = React.useState("");
  const [time, settime] = React.useState("");
  const [isnumOfShotsLimited, setisnumOfShotsLimited] = React.useState(false);
  const [numberOfShots, setNumberOfShots] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };
  const handleSubmit = async () => {
    let data;
    if (!doesHaveFinal) {
      data = {
        doesHaveFinal: doesHaveFinal,
      };
    } else {
      data = {
        doesHaveFinal: doesHaveFinal,
        timeSequences: {
          name: name,
          time: time,
          isnumOfShotsLimited: isnumOfShotsLimited,
          numberOfShots: numberOfShots,
        },
      };
    }
    const result = JSON.parse(
      await window.api.discipline.final({ team: data, id: item._id })
    );
    console.log(result);
    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.discipline.get());
    // if (items.err) return addMessage(items, dispatch);
    dispatch(setDiscipline(items.result));
    setItem(null);
  };
  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">final</p>

      <form style={{ gridTemplateColumns: "1fr" }}>
        <div sx={{ display: "flex" }}>
          <label style={{ width: "150px" }}>does Have Final:</label>
          <Box>
            <Switch
              checked={doesHaveFinal}
              onChange={(event) => setdoesHaveFinal(event.target.checked)}
            />
          </Box>
        </div>

        <TextField
          size="small"
          disabled={!doesHaveFinal}
          label="name"
          value={name}
          onChange={(event) => setname(event.target.value)}
        />
        <TextField
          size="small"
          type="number"
          disabled={!doesHaveFinal}
          label="time"
          value={time}
          onChange={(event) => settime(event.target.value)}
        />
        <div sx={{ display: "flex" }}>
          <label style={{ width: "150px" }}>is number Of Shots Limited:</label>
          <Box>
            <Switch
              checked={isnumOfShotsLimited}
              onChange={(event) => setisnumOfShotsLimited(event.target.checked)}
            />
          </Box>
        </div>
        <TextField
          size="small"
          type="number"
          label="numberOfShots"
          value={numberOfShots}
          onChange={(event) => setNumberOfShots(event.target.value)}
        />

        <Button size="medium" variant="contained" onClick={handleSubmit}>
          add
        </Button>
      </form>
    </>
  );
};

const OnRegular = ({ handleClose, item, setItem }) => {
  const [user, setUser] = React.useState("");
  const { register, reset, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [place, setPlace] = React.useState("");
  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };

  const onSubmitHandler = async (data) => {
    let datas = {
      id: item._id,
      team: data,
    };
    const result = JSON.parse(await window.api.discipline.onRegular(datas));
    console.log(result);
    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.discipline.get());
    // if (items.err) return addMessage(items, dispatch);
    dispatch(setDiscipline(items.result));
    setItem(null);
  };

  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">On Regular</p>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          size="small"
          {...register("total", {
            required: true,
          })}
          type="number"
          label="total"
        />
        <TextField
          size="small"
          {...register("forPreparation", {
            required: true,
          })}
          type="number"
          label="forPreparation"
        />

        <TextField
          size="small"
          label="forPractice"
          type="number"
          {...register("forPractice")}
        />
        <TextField
          size="small"
          label="forCompetition"
          type="number"
          {...register("forCompetition")}
        />

        <Button size="medium" variant="contained" type="submit">
          add
        </Button>
      </form>
    </>
  );
};

const OnElectronic = ({ handleClose, arrayPlaces, title, item, setItem }) => {
  const [user, setUser] = React.useState("");
  const { register, reset, handleSubmit, setValue } = useForm();
  const [place, setPlace] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };

  const onSubmitHandler = async (data) => {
    let datas = {
      id: item._id,
      team: data,
    };
    const result = JSON.parse(await window.api.discipline.onElectronic(datas));

    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.discipline.get());
    // if (items.err) return addMessage(items, dispatch);

    dispatch(setDiscipline(items.result));
    setItem(null);
  };

  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">On Electronic</p>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          size="small"
          {...register("total", {
            required: true,
          })}
          type="number"
          label="total"
        />
        <TextField
          size="small"
          {...register("forPreparation", {
            required: true,
          })}
          type="number"
          label="forPreparation"
        />

        <TextField
          size="small"
          label="forPractice"
          type="number"
          {...register("forPractice")}
        />
        <TextField
          size="small"
          label="forCompetition"
          type="number"
          {...register("forCompetition")}
        />

        <Button size="medium" variant="contained" type="submit">
          add
        </Button>
      </form>
    </>
  );
};
const OnMigratory = ({ handleClose, arrayPlaces, title, item, setItem }) => {
  const [user, setUser] = React.useState("");
  const { register, reset, handleSubmit, setValue } = useForm();
  const [place, setPlace] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };

  const onSubmitHandler = async (data) => {
    let datas = {
      id: item._id,
      team: data,
    };
    const result = JSON.parse(await window.api.discipline.onMigratory(datas));

    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.discipline.get());
    // if (items.err) return addMessage(items, dispatch);

    dispatch(setDiscipline(items.result));
    setItem(null);
  };

  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">On Migratory</p>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          size="small"
          {...register("total", {
            required: true,
          })}
          type="number"
          label="total"
        />
        <TextField
          size="small"
          {...register("forPreparation", {
            required: true,
          })}
          type="number"
          label="forPreparation"
        />

        <TextField
          size="small"
          label="forPractice"
          type="number"
          {...register("forPractice")}
        />
        <TextField
          size="small"
          label="forCompetition"
          type="number"
          {...register("forCompetition")}
        />

        <Button size="medium" variant="contained" type="submit">
          add
        </Button>
      </form>
    </>
  );
};
const Onother = ({ handleClose, arrayPlaces, title, item, setItem }) => {
  const [user, setUser] = React.useState("");
  const { register, reset, handleSubmit, setValue } = useForm();
  const [place, setPlace] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };

  const onSubmitHandler = async (data) => {
    let datas = {
      id: item._id,
      team: data,
    };
    const result = JSON.parse(await window.api.discipline.other(datas));

    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.discipline.get());
    // if (items.err) return addMessage(items, dispatch);

    dispatch(setDiscipline(items.result));
    setItem(null);
  };

  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">Other</p>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          size="small"
          {...register("total", {
            required: true,
          })}
          type="number"
          label="total"
        />
        <TextField
          size="small"
          {...register("forPreparation", {
            required: true,
          })}
          type="number"
          label="forPreparation"
        />

        <TextField
          size="small"
          label="forPractice"
          type="number"
          {...register("forPractice")}
        />
        <TextField
          size="small"
          label="forCompetition"
          type="number"
          {...register("forCompetition")}
        />

        <Button size="medium" variant="contained" type="submit">
          add
        </Button>
      </form>
    </>
  );
};
export default AddStuff;
