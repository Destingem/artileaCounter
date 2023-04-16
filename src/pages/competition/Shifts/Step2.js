import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import {

  selectShooter,

  setShooter,
} from "../../../reducers/appSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddShiftStep2 = ({
    array,
    shiftRef,
    setShiftRef,
    refrees,
    setRefress,
    number,
  }) => {
    const dispatch = useDispatch();
    const [active, setactive] = useState(false);
    const { register, reset, handleSubmit, setValue } = useForm();
    const [refree, setrefrees] = React.useState();
    const [shootingRanges, setshootingRanges] = React.useState();

    const shooter = useSelector(selectShooter);
    const onSubmitHandler = async (data) => {
      let datas = {
        shootingRange: shootingRanges,
        start: document.getElementById("start").value
          ? document.getElementById("start").value
          : "",
        end: document.getElementById("end").value
          ? document.getElementById("end").value
          : "",
      };
      setShiftRef(datas);
      setactive(!active);
    };
    let onSubmitHandlerRef = async (data) => {
      if (refree) {
        setRefress((prev) => [...prev, refree]);
      }
    };
  
    const handleChange = (event) => {
      setrefrees(event.target.value);
    };
  
    const handleChange1 = (event) => {
      setshootingRanges(event.target.value);
    };

    React.useEffect(() => {
      const getData = async () => {
        const result = JSON.parse(await window.api.people.get());
        dispatch(setShooter(result.result));
      };
      getData();
    }, [dispatch]);
  
    return (
      <div>
        <div>Shift Number : {number}</div>
        <form>
          <TextField size="small" type="date" id="start" disabled={active} />
          <TextField size="small" type="date" id="end" disabled={active} />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-helper-label">
              shootingRanges
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={shootingRanges}
              label="shootingRanges"
              size="small"
              onChange={handleChange1}
              disabled={active}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {array.map((row) => {
                return row.shootingRanges.map((el) => (
                  <MenuItem value={el._id}>{el.name}</MenuItem>
                ));
              })}
            </Select>
          </FormControl>
  
          <Button variant="contained" size="small" onClick={onSubmitHandler}>
            save
          </Button>
  
          <FormControl sx={{ m: 1 }} size="small">
            <InputLabel id="demo-simple-select-helper-label">Refrees</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={refree}
              label="Refrees"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {array.map((row) => {
                return row.staff.refrees.map((el) => (
                  <MenuItem value={el._id}>{el.fname + " " + el.lname}</MenuItem>
                ));
              })}
            </Select>
          </FormControl>
          <Button onClick={onSubmitHandlerRef} size="small">
            save Refree
          </Button>
        </form>
  
        <div
          style={{
            height: "100px",
            overflow: "auto",
            marginTop: 20,
            marginLeft: "70px",
          }}
        >
          <ul>
            {refrees?.map((el, index) => {
              let m = shooter.filter((els) => {
                console.log(el.shooter);
                return els._id === el;
              });
              let tab = m[0];
  
              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    width: "300px",
                    justifyContent: "space-between",
                  }}
                >
                  {tab?.fname}
  
                  <Icon
                    color="#ff5c35"
                    icon="mdi:delete-circle"
                    onClick={() => {
                      setRefress([
                        ...refrees.slice(0, index),
                        ...refrees.slice(index + 1),
                      ]);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
  export default AddShiftStep2;