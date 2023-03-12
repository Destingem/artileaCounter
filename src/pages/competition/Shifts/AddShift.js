import { Icon } from "@iconify/react";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDiscipline,
  selectShooter,
  setCompitition,
  setDiscipline,
  setShooter,
} from "../../../reducers/appSlice";
import { AddMessage } from "../../../reducers/message/AddMessage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";
import { height } from "@mui/system";

const steps = ["ADD Shooting Sessions", "Add Shift Refrees", "Add Disciplines"];

function AddShift({ open, handleClose, id, array }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [ShootingSaison, setShootingSaison] = React.useState([]);
  const [refrees, setRefress] = React.useState([]);
  const [shiftRef, setShiftRef] = React.useState();
  const [desc, setdesc] = React.useState([]);
  const [number, setnumber] = React.useState([]);
  const dispatch = useDispatch();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = async () => {
    let data = {
      shiftNumber: number + 1,
      shootingSessions: ShootingSaison,
      shiftRefrees: {
        refrees: refrees,
        shootingRange: shiftRef.shootingRange ? shiftRef.shootingRange : "",
        start: shiftRef.start ? shiftRef.start : "",
        end: shiftRef.end ? shiftRef.end : "",
      },
      disciplines: desc,
    };
    console.log(data);
    const result = JSON.parse(
      await window.api.compitition.addshifts({ data: data, _id: id })
    );
    console.log(result);
    AddMessage(result, dispatch);
    const results = JSON.parse(await window.api.compitition.get());
    console.log(results);
    dispatch(setCompitition(results.result));

    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div id="is" className={style.modal}>
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (handleStep(index)) {
                labelProps.optional = (
                  <Typography variant="caption">required</Typography>
                );
              }
              if (handleStep(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Finish</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  {
                    <Steps
                      index={activeStep}
                      array={array}
                      setShootingSaison={setShootingSaison}
                      ShootingSaison={ShootingSaison}
                      refrees={refrees}
                      setRefress={setRefress}
                      shiftRef={shiftRef}
                      setShiftRef={setShiftRef}
                      desc={desc}
                      setdesc={setdesc}
                      setnumber={setnumber}
                    />
                  }
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block" }}
                      >
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </div>
    </Modal>
  );
}

const AddShiftStep1 = ({
  array,
  ShootingSaison,
  setShootingSaison,
  setnumber,
}) => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, setValue } = useForm();
  const [shooterName, setShooterName] = React.useState();
  const [DesplineName, setDesplineName] = React.useState();
  const [numbr, setnumbr] = React.useState();
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
  useEffect(() => {
    array.map((row) => {
      setnumbr(row.shifts.length);
      setnumber(row.shifts.length);
    });
  });
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.people.get());
      dispatch(setShooterName(result.result));
    };
    getData();
  }, [dispatch]);

  return (
    <div>
      <div>Shift Number : {numbr + 1}</div>
      <form>
        <FormControl sx={{ m: 1, Width: "150px" }} size="small">
          <InputLabel id="demo-simple-select-helper-label">Shooter</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={shooterName}
            label="Shooter"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="">
              <em>None</em>
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
            Discipline
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={DesplineName}
            label="Discipline"
            size="small"
            onChange={handleChange1}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {array.map((row) => {
              return row.disciplines.map((el) => (
                <MenuItem value={el?._id}>{el?.name}</MenuItem>
              ));
            })}
          </Select>
        </FormControl>
        <TextField size="small" id="place" label="Place" type="number" />
        <TextField size="small" id="notes" label="Note" />

        <Button size="medium" variant="contained" onClick={onSubmitHandler}>
          add
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

const AddShiftStep2 = ({
  array,
  shiftRef,
  setShiftRef,
  refrees,
  setRefress,
}) => {
  const dispatch = useDispatch();
  const [active, setactive] = useState(false);
  const { register, reset, handleSubmit, setValue } = useForm();
  const [refree, setrefrees] = React.useState();
  const [shootingRanges, setshootingRanges] = React.useState();
  const [numbr, setnumbr] = React.useState();
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
  useEffect(() => {
    array.map((row) => {
      setnumbr(row.shifts.length);
    });
  });
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.people.get());
      dispatch(setShooter(result.result));
    };
    getData();
  }, [dispatch]);

  return (
    <div>
      <div>Shift Number : {numbr + 1}</div>
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

function Steps({
  index,
  array,
  ShootingSaison,
  setShootingSaison,
  shiftRef,
  setShiftRef,
  refrees,
  setRefress,
  desc,
  setdesc,
  setnumber,
}) {
  return (
    <Box
      sx={{
        p: 2,
        my: 3,
      }}
    >
      {index === 0 ? (
        <AddShiftStep1
          array={array}
          ShootingSaison={ShootingSaison}
          setShootingSaison={setShootingSaison}
          setnumber={setnumber}
        />
      ) : index === 1 ? (
        <AddShiftStep2
          array={array}
          shiftRef={shiftRef}
          setShiftRef={setShiftRef}
          refrees={refrees}
          setRefress={setRefress}
        />
      ) : (
        <AddShiftStep3 array={array} desc={desc} setdesc={setdesc} />
      )}
    </Box>
  );
}
export default AddShift;
