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
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { TbTarget } from "react-icons/tb";
import Search from "./Search";
import MenuOption from "./MenuOption";
function Header({ path, redirect, setRedirection }) {
  const dispatch = useDispatch();
  
  const user = useSelector(selectUser);
  
  if (!user) return <Navigate replace to="/" />;
  return (
    <div data-style="header">
      <h3>{path ? path : "dashboard"}</h3>
     
     <Search redirect={redirect} setRedirection={setRedirection} />
      
    
      <div style={{display: "flex"}}>
        <div data-style="user">
         
          
        </div>
        <Button style={{ display: "flex" }}>
          <TbTarget />
        </Button>
       <Button>
       <HiOutlineStatusOnline />
       </Button>
        <MenuOption style={{ display: "flex" }}>
         <AiOutlineFundProjectionScreen />
        </MenuOption>
      </div>
    </div>
  );
}

export default Header;
