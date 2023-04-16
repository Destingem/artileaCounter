import React, { useEffect, useState } from "react";
import { Navigate, useLocation} from "react-router-dom";

// pages and components
import Links from "./Links";
// scss
import style from "./style.module.scss";
import Header from "./Header";
import RoutesContainer from "./RoutesContainer";
import Linky from "./Linky";
import { useHotkeys } from "@mantine/hooks";
import ShortCuts from "./ShortCuts";
import NavBarWrap from "./NavBarWrap";

function Container() {
  const path = useLocation().pathname;
  const [pathname, setPathname] = React.useState("");
  const [gridSize, setGridSize] = React.useState("250px 1fr");
  const [redirect, setRedirection] = useState(null);
  useEffect(() => {
    if (path) setPathname(path.substring(path.lastIndexOf("/") + 1));
  }, [path]);

  if (pathname === "app") return <Navigate replace to="/app/" />;
  
 
  return (
    <div className={style.index} style={{gridTemplateColumns: gridSize}}>
      <NavBarWrap setGridSize={setGridSize} />
      <ShortCuts redirect={redirect} setRedirection={setRedirection} />
      <div className={style.container}>
        <Header redirect={redirect} setRedirection={setRedirection} path={pathname} user={"user"}  />
        <RoutesContainer />
      </div>
    </div>
  );
}

export default Container;
