import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {

  selectShooter,

} from "../../../reducers/appSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NumberInput } from "@mantine/core";


const AddShiftStep1 = ({
    array,
    ShootingSaison,
    setShootingSaison,
    setnumber,
    number,
  }) => {
    const dispatch = useDispatch();
    const { register, reset, handleSubmit, setValue } = useForm();
    const [shooterName, setShooterName] = React.useState();
    const [DesplineName, setDesplineName] = React.useState();

    const shooter = useSelector(selectShooter);
    const onSubmitHandler = async (data) => {
      console.log(shooterName);
      if (shooterName && DesplineName) {
        let datas = {
          shooter: shooterName,
          discipline: DesplineName,
          notes: document.getElementById("notes").value
            ? document.getElementById("notes").value
            : "",
          place: document.getElementById("place").value
            ? document.getElementById("place").value
            : "",
        };
        console.log(datas);
        setShootingSaison((prev) => [...prev, datas]);
      }
    };
    const handleChange = (event) => {
      setShooterName(event.target.value);
    };
  
    const handleChange1 = (event) => {
      setDesplineName(event.target.value);
    };
    
    React.useEffect(() => {
      const getData = async () => {
        const result = JSON.parse(await window.api.people.get());
        dispatch(setShooterName(result.result));
      };
      getData();
    }, [dispatch]);
  console.log(number)
    return (
      <div>
        <NumberInput label={"Číslo směny"} defaultValue={number && !isNaN(number) && !Array.isArray(number) && number?.toFixed(0) ? number : 1 } placeholder={number ? number : " "} onChange={(change)=> {setnumber(change);}}   />
        <form>
          <FormControl sx={{ m: 1, Width: "150px" }} size="small">
            <InputLabel id="demo-simple-select-helper-label">Střelec</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={shooterName}
              label="Střelec"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="">
                <em>Nic</em>
              </MenuItem>
              {array.map((row) => {
                return row.shooters.map((el) => (
                  <MenuItem value={el._id}>{el.fname + " " + el.lname}</MenuItem>
                ));
              })}
            </Select>
          </FormControl>
  
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-helper-label">
            Disciplína
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={DesplineName}
              label="Disciplína"
              size="small"
              onChange={handleChange1}
            >
              <MenuItem value="">
                <em>Nic</em>
              </MenuItem>
              {array.map((row) => {
                return row.disciplines.map((el) => (
                  <MenuItem value={el?._id}>{el?.name}</MenuItem>
                ));
              })}
            </Select>
          </FormControl>
          <TextField size="small" id="place" label="Místo" type="number" />
          <TextField size="small" id="notes" label="Poznámka" />
  
          <Button size="medium" variant="contained" onClick={onSubmitHandler}>
            Přidat
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
            {ShootingSaison?.map((el, index) => {
              let m = shooter.filter((els) => {
                console.log(el.shooter);
                return els._id === el.shooter;
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
                  {tab?.fname ? tab.fname : "ShootingSaison : " + index}
  
                  <Icon
                    color="#ff5c35"
                    icon="mdi:delete-circle"
                    onClick={() => {
                      setShootingSaison(
                        ShootingSaison.filter(
                          (item) => item !== ShootingSaison[index]
                        )
                      );
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
  export default AddShiftStep1;