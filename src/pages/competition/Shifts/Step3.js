import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectDiscipline,
 
  setDiscipline,

} from "../../../reducers/appSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const AddShiftStep3 = ({ array, desc, setdesc }) => {
    const [sates, setStates] = useState();
    const dispatch = useDispatch();
    const [discipline, setdisciplines] = React.useState();
    const [shootingRanges, setshootingRanges] = React.useState();
    const [numbr, setnumbr] = React.useState();
    const shooter = useSelector(selectDiscipline);
  
    let onSubmitHandlerRef = async (data) => {
      if (discipline) {
        setdesc((prev) => [...prev, discipline]);
      }
    };
  
    const handleChange = (event) => {
      setdisciplines(event.target.value);
    };
  
    useEffect(() => {
      array.map((row) => {
        setnumbr(row.shifts.length);
      });
    });
    React.useEffect(() => {
      const getData = async () => {
        const result = JSON.parse(await window.api.discipline.get());
        dispatch(setDiscipline(result.result));
      };
      getData();
    }, [dispatch]);
  
    return (
      <div>
        <div>Shift Number : {numbr + 1}</div>
        <form>
          <FormControl sx={{ m: 1 }} size="small">
            <InputLabel id="demo-simple-select-helper-label">
              desciplines
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={discipline}
              label="disciplines"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {array.map((row) => {
                return row.disciplines.map((el) => (
                  <MenuItem value={el._id}>{el.name}</MenuItem>
                ));
              })}
            </Select>
          </FormControl>
          <Button size="medium" onClick={onSubmitHandlerRef}>
            save discipline
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
            {desc?.map((el, index) => {
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
                  {tab?.name}
  
                  <Icon
                    color="#ff5c35"
                    icon="mdi:delete-circle"
                    onClick={() => {
                      setdesc([
                        ...desc.slice(0, index),
                        ...desc.slice(index + 1),
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
  export default AddShiftStep3;