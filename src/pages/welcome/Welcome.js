import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import style from "./style.module.scss";

// images
import img from "../../img/welcome.png";
import logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../reducers/appSlice";
import { useForm } from "react-hook-form";
import { AddMessage } from "../../reducers/message/AddMessage";
function Welcome() {
  const { register, reset, handleSubmit,setValue } = useForm();

  const [check, setCheck] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [login, setLogin] = React.useState(true);
  const setLoginHandler = () => {
    setLogin((prev) => !prev);
  };
  const submitHandler = async (data) => {
    const datas = {
      password: data.password,
      email: data.email,
    };
    // send data to server and wait for the response
    // parse the json response
    const result = JSON.parse(await window.api.auth.login(datas));

    // show the err or success message
    AddMessage(result.message, dispatch);

    // reset the form if error found
    if (!result.err) {
      dispatch(setUser(result.result.name));
      const info = JSON.parse(
        await window.api.inventory.getInfo(result.result._id)
      );
      if (!info.err) dispatch(setUser(info.result));
      return reset();
    }
    if (result.err) {
      AddMessage(result, dispatch);
    }
  };

  const submitHandlerReg = async (data) => {
    const datas = {
      name: data.name,
      password: data.regpassword,
      email: data.regemail,
    };
    console.log(datas);
    const result = JSON.parse(await window.api.auth.signup(datas));
    AddMessage(result, dispatch);

    if (!result.err) {
      dispatch(setUser(result.result));
      return reset();
    }
    if (result.err) {
      AddMessage(result, dispatch);
    }
  };

  if (user) return <Navigate replace to="/app/" />;

  return (
    <div className={style.welcome}>
      <div data-style="main">
        <img src={img} alt="welcome" />
      </div>

      <div data-style="connection" data-display={login && "show"}>
        <img src={logo} alt="logo" />
        <h2>login</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            size="small"
            label="Email"
            {...register("email")}
          />
          <TextField
            size="small"
            label="password"
            {...register("password")}
            type="password"
          />

          <Button size="large" type="submit">
            login
          </Button>
        </form>
        <small onClick={setLoginHandler}>don't have an account ?</small>
      </div>

      <div data-style="connection" data-display={!login && "show"}>
        <img src={logo} alt="logo" />
        <h2>register</h2>
        <form onSubmit={handleSubmit(submitHandlerReg)}>
          <TextField
            size="small"
            label="user name"
            {...register("name")}
          />
          <TextField
            size="small"
            label="Email"
            type="email"
            {...register("regemail")}
          />
          <TextField
            size="small"
            label="password"
            type="password"
            {...register("regpassword")}
          />

          <Button size="large" type="submit">
            register
          </Button>
        </form>
        <small onClick={setLoginHandler}>already have an account ?</small>
      </div>
    </div>
  );
}

export default Welcome;
