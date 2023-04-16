import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import style from "./style.module.scss";
import {Grid, Group, Image, Text} from "@mantine/core"
// images
import img from "../../img/welcome.png";
import logo from "../../img/counter.png";
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
  let form = useForm
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
      console.log(result);
      dispatch(setUser({name: result.result.name, email: result.result.email}));
      const info = JSON.parse(
        await window.api.inventory.getInfo(result.result._id)
      );
      console.log(info);
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
      <div data-style="main" style={{backgroundColor: "#fff", display: "flex", flexDirection: "column"}}>
       <div style={{width: "100%", height: "10vh", backgroundColor: "#4A449F", display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
        {["", "", "", ""].map(()=> {
          return(
            <Group>
          <Text color="white" weight={600} size="xl" >Omrkněte náš eshop</Text>
          <Text href="www.artilea.eu" component="a" color="#FF5C35" weight={600} size="xl" >www.artilea.eu</Text>
        </Group>
          )
        }
        )}
       </div>
       <div style={{width: "15vw", height: "80vh", backgroundColor:"#E6E7E8",  margin: "auto 0 auto auto", padding: "2vh 0 0 0" }}>
        <Text align="center" weight={700} size="xl" >Nabídka z našeho eshopu</Text>
        <Grid></Grid>
       </div>
      </div>

      <div data-style="connection" data-display={login && "show"}>
        <Group><img style={{padding: "4%"}} src={logo}  alt="logo" />
        <Text weight={600} size="xl" >Artilea Counter</Text>
        </Group>
        <h2>Přihlášení</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            size="small"
            label="Emailová adresa nebo nick"
            {...register("email")}
          />
          <TextField
            size="small"
            label="Heslo"
            {...register("password")}
            type="password"
          />

          <Button size="large" type="submit">
            Přihlásit se
          </Button>
        </form>
        <small onClick={setLoginHandler}>Ještě nemáte účet ?</small>
      </div>

      <div data-style="connection" data-display={!login && "show"}>
        <img src={logo} alt="logo" />
        <h2>Registrace</h2>
        <form onSubmit={handleSubmit(submitHandlerReg)}>
          <TextField
            size="small"
            label="Uživatelské jméno"
            {...register("name")}
          />
          <TextField
            size="small"
            label="Emailová adresa"
            type="email"
            {...register("regemail")}
          />
          <TextField
            size="small"
            label="Heslo"
            type="password"
            {...register("regpassword")}
          />

          <Button size="large" type="submit">
            Registrovat se
          </Button>
        </form>
        <small onClick={setLoginHandler}>Už máte účet ?</small>
      </div>
    </div>
  );
}

export default Welcome;
