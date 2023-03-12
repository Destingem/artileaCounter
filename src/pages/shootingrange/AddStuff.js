import { Icon } from "@iconify/react";
import { Button, Modal } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import {
  resetShootingrange,
  selectDiscipline,
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
import Box from "@mui/material/Box";

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
                <Tab label="Add Range Manager" {...a11yProps(0)} />
                <Tab label="Add Place" {...a11yProps(1)} />
                <Tab label="Other" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ADDRANGEMANAGER
                item={item}
                arrayPlaces={array}
                handleClose={handleClose}
                title={"Add Range Manager"}
                setItem={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ADDPLACE
                item={item}
                arrayPlaces={arrayP}
                handleClose={handleClose}
                title={"Add Place"}
                setItem={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ADDOTHER
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

const ADDPLACE = ({ handleClose, arrayPlaces, title, item, setItem }) => {
  const [user, setUser] = React.useState("");
  const [place, setPlace] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };
  console.log(arrayPlaces);
  const handleSubmit = async () => {
    let datas = {
      id: item._id,
      team: place,
    };
    const result = JSON.parse(await window.api.shootingrange.addplace(datas));
    console.log(result);
    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.shootingrange.get());
    // if (items.err) return addMessage(items, dispatch);
    dispatch(setShootingrange(items.result));
    setItem(null);
  };
  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">{title}</p>

      <form style={{ gridTemplateColumns: "1fr" }}>
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
            {arrayPlaces.map((ar) => (
              <MenuItem value={ar._id} key={ar._id}>
                {ar.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button size="medium" variant="contained" onClick={handleSubmit}>
          add
        </Button>
      </form>
    </>
  );
};

const ADDRANGEMANAGER = ({
  handleClose,
  arrayPlaces,
  title,
  item,
  setItem,
}) => {
  const [user, setUser] = React.useState("");
  const dispatch = useDispatch();
  const [place, setPlace] = React.useState("");
  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };

  const onSubmitHandler = async (data) => {
    let datas = {
      id: item._id,
      team: place,
    };
    const result = JSON.parse(await window.api.shootingrange.addmanager(datas));
    console.log(result);
    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.shootingrange.get());
    // if (items.err) return addMessage(items, dispatch);
    dispatch(setShootingrange(items.result));
    setItem(null);
  };

  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">{title}</p>

      <form style={{ gridTemplateColumns: "1fr" }}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Range Manager
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={user}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {arrayPlaces.map((ar) => (
              <MenuItem value={ar._id} key={ar._id}>
                {ar.fname}
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

const ADDOTHER = ({ handleClose, arrayPlaces, title, item, setItem }) => {
  const [user, setUser] = React.useState("");
  const [place, setPlace] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setUser(event.target.value);
    setPlace(event.target.value);
  };

  const onSubmitHandler = async (data) => {
    let datas = {
      id: item._id,
      team: place,
    };
    const result = JSON.parse(await window.api.shootingrange.addother(datas));

    AddMessage(result, dispatch);

    const items = JSON.parse(await window.api.shootingrange.get());
    // if (items.err) return addMessage(items, dispatch);

    dispatch(setShootingrange(items.result));
    setItem(null);
  };

  return (
    <>
      <Icon onClick={handleClose} data-style="exit" icon="mdi:cancel-box" />
      <p data-style="title">{title}</p>

      <form style={{ gridTemplateColumns: "1fr" }}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Select other Staff
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={user}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {arrayPlaces.map((ar) => (
              <MenuItem value={ar._id} key={ar._id}>
                {ar.fname}
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
