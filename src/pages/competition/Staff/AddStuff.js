import { Icon } from "@iconify/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, TextField, Box, Switch } from "@mui/material";

import style from "./style.module.scss";
import {
  resetShootingrange,
  selectDiscipline,
  setCompitition,
  setDiscipline,
  setShootingrange,
  setTeams,
} from "../../../reducers/appSlice";
import { AddMessage } from "../../../reducers/message/AddMessage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShooter,
  setShooter,
  resetTeams,
} from "../../../reducers/appSlice";
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

function AddStuff({ open, handleClose, title, id }) {
  const { register, reset, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const shooters = useSelector(selectShooter);
  const places = useSelector(selectDiscipline);
  const [array, setArray] = React.useState(shooters);
  const [arrayP, setArrayP] = React.useState(places);
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

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.people.get());
      dispatch(setShooter(result.result));
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.discipline.get());
      dispatch(setDiscipline(result.result));
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (shooters) setArray(shooters);
  }, [shooters]);
  React.useEffect(() => {
    if (places) setArrayP(places);
  }, [places]);
  return (
    <Modal
      open={open}
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
                <Tab label="STuff" {...a11yProps(0)} />
                <Tab label="ADD Refrees" {...a11yProps(1)} />
                <Tab label="Other" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Staff
                arrayPlaces={array}
                handleClose={handleClose}
                title={"Stuff"}
                id={id}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Refrees
                arrayPlaces={array}
                handleClose={handleClose}
                title={"Add Refrees"}
                id={id}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OtherStaff
                arrayPlaces={arrayP}
                handleClose={handleClose}
                title={"Add Other"}
                id={id}
              />
            </TabPanel>
          </Box>
        </div>
      </div>
    </Modal>
  );
}

const OtherStaff = ({ handleClose, arrayPlaces, title, item, setItem, id }) => {
  const dispatch = useDispatch();
  const [headRefree, setheadRefree] = React.useState();
  const [director, setdirector] = React.useState();
  const shooters = useSelector(selectShooter);
  const [array, setArry] = React.useState(shooters);

  const onSubmitHandler = async (data) => {
    let datas = {
      _id: id,
      data: director,
    };
    console.log(datas);
    const result = JSON.parse(
      await window.api.compitition.addstaffotherStaff(datas)
    );

    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.compitition.get());
    // if (items.err) return addMessage(items, dispatch);

    dispatch(setCompitition(items.result));
    setItem(null);
  };

  const handleChange = (event) => {
    setdirector(event.target.value);
  };
  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">{title}</p>

      <form style={{ gridTemplateColumns: "1fr" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">director</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={director}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {array.map((el) => (
              <MenuItem key={el._id} value={el._id}>
                {el.fname + " " + el.lname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button size="medium" variant="contained" onClick={onSubmitHandler}>
          add
        </Button>
      </form>
    </>
  );
};

const Refrees = ({ handleClose, arrayPlaces, title, item, setItem, id }) => {
  const dispatch = useDispatch();
  const [headRefree, setheadRefree] = React.useState();
  const [director, setdirector] = React.useState();
  const shooters = useSelector(selectShooter);
  const [array, setArry] = React.useState(shooters);

  const onSubmitHandler = async (data) => {
    let datas = {
      _id: id,
      data: director,
    };
    console.log(datas);
    const result = JSON.parse(
      await window.api.compitition.addstaffrefrees(datas)
    );

    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.compitition.get());
    // if (items.err) return addMessage(items, dispatch);

    dispatch(setCompitition(items.result));
    setItem(null);
  };

  const handleChange = (event) => {
    setdirector(event.target.value);
  };

  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">{title}</p>

      <form style={{ gridTemplateColumns: "1fr" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">director</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={director}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {array.map((el) => (
              <MenuItem key={el._id} value={el._id}>
                {el.fname + " " + el.lname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button size="medium" variant="contained" onClick={onSubmitHandler}>
          add
        </Button>
      </form>
    </>
  );
};

const Staff = ({ handleClose, arrayPlaces, title, item, setItem, id }) => {
  const dispatch = useDispatch();
  const [headRefree, setheadRefree] = React.useState();
  const [director, setdirector] = React.useState();
  const shooters = useSelector(selectShooter);
  const [array, setArry] = React.useState(shooters);
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.people.get());
      dispatch(setShooter(result.result));
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (shooters) setArry(shooters);
  }, [shooters]);
  const onSubmitHandler = async (data) => {
    let datas = {
      _id: id,
      data: {
        headRefree: headRefree,
        director: director,
      },
    };
    console.log(datas);
    const result = JSON.parse(await window.api.compitition.addstaff(datas));

    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.compitition.get());
    // if (items.err) return addMessage(items, dispatch);

    dispatch(setCompitition(items.result));
    setItem(null);
  };

  const handleChangeHead = (event) => {
    setheadRefree(event.target.value);
  };
  const handleChange = (event) => {
    setdirector(event.target.value);
  };
  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">{title}</p>

      <form style={{ gridTemplateColumns: "1fr" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            headRefree
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={headRefree}
            label="Age"
            onChange={handleChangeHead}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {array.map((el) => (
              <MenuItem key={el._id} value={el._id}>
                {el.fname + " " + el.lname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">director</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={director}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {array.map((el) => (
              <MenuItem key={el._id} value={el._id}>
                {el.fname + " " + el.lname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button size="medium" variant="contained" onClick={onSubmitHandler}>
          add
        </Button>
      </form>
    </>
  );
};

export default AddStuff;
