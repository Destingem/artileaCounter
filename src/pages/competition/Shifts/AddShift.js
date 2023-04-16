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
import AddShiftStep1 from "./Step1";
import AddShiftStep2 from "./Step2";
import AddShiftStep3 from "./Step3";
const steps = ["Přidání shooting session", "Informace o směně", "Add Disciplines"];

function AddShift({ open, handleClose, id, array }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [ShootingSaison, setShootingSaison] = React.useState([]);
  const [refrees, setRefress] = React.useState([]);
  const [shiftRef, setShiftRef] = React.useState();
  const [desc, setdesc] = React.useState([]);
  const [number, setnumber] = React.useState(array[0].shifts.length);
 console.log(ShootingSaison);
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
      shiftNumber: number,
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
 console.log(array)

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
                      number={number}
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
                    Zpět
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Pokračovat
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
                          ? "Vytvořit"
                          : "Dokončit"}
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
  number,
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
          number={number}
        />
      ) : index === 1 ? (
        <AddShiftStep2
          array={array}
          shiftRef={shiftRef}
          setShiftRef={setShiftRef}
          refrees={refrees}
          setRefress={setRefress}
          number={number}
        />
      ) : (
        <AddShiftStep3 array={array} desc={desc} setdesc={setdesc} number={number} />
      )}
    </Box>
  );
}
export default AddShift;
