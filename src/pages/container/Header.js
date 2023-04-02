import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../../reducers/appSlice";
import { Button } from "@mui/material";
import { resetUser } from "../../reducers/appSlice";
import { Navigate } from "react-router-dom";
import { Kbd, Select } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
import { useHotkeys } from "@mantine/hooks";
import Search from "./Search";
function Header({ path }) {
  const dispatch = useDispatch();
  
  const user = useSelector(selectUser);
  
  if (!user) return <Navigate replace to="/" />;
  return (
    <div data-style="header">
      <h3>{path ? path : "dashboard"}</h3>
     
     <Search />
      
    
      <div style={{display: "flex"}}>
        <div data-style="user">
          <span>{user}</span>
          <Icon icon="mdi:user-circle" />
        </div>
       
        <Button onClick={()=>{
          dispatch(resetUser())
        }} style={{ display: "flex" }}>
          <Icon icon="ph:sign-out-bold" />
        </Button>
      </div>
    </div>
  );
}

export default Header;
