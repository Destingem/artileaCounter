import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

// pages and components
import Links from "./Links";
// scss
import style from "./style.module.scss";
import Header from "./Header";
import RoutesContainer from "./RoutesContainer";

function Container() {
  const path = useLocation().pathname;
  const [pathname, setPathname] = React.useState("");

  useEffect(() => {
    if (path) setPathname(path.substring(path.lastIndexOf("/") + 1));
  }, [path]);

  if (pathname === "app") return <Navigate replace to="/app/" />;

  return (
    <div className={style.index}>
      <Links />

      <div className={style.container}>
        <Header path={pathname} user={"user"} />
        <RoutesContainer />
      </div>
    </div>
  );
}

export default Container;
