import { useHotkeys, useTimeout } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ShortCuts({redirect, setRedirection}){
   
    useEffect(()=> {
       setRedirection(null);
    }, [redirect])
    useHotkeys([["alt+1", () => {setRedirection("/app/")}], ["alt+2", () => {setRedirection("/app/competition")}], ["alt+3", () => {setRedirection("/app/peoples")}], ["alt+4", () => {setRedirection("/app/discipline")}], ["alt+5", () => {setRedirection("/app/ShootingRange")}], ["alt+6", () => {setRedirection("/app/clubs")}], ["alt+7", () => {setRedirection("/app/competitions")}], ["alt+8", () => {setRedirection("/app/competitors")}], ["alt+9", ()=> {setRedirection("/app/settings")}] ]);
    useHotkeys([["ctrl+alt+i", ()=> {setRedirection("/app/customization")}]])
    if(redirect) return <Navigate replace to={redirect} />
    return null;
}