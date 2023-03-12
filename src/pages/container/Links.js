import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";

// style
import style from "./style.module.scss";

// image
import logo from "../../img/logo-png.png";

function Links() {
  return (
    <div className={style.nav}>
      <img src={logo} alt="logo" />
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/"
      >
        <Icon icon="material-symbols:dashboard-customize-rounded" />
        <span>dashboard</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/competition"
      >
        <Icon icon="pixelarticons:tournament" />
        <span>competition</span>
      </NavLink>
      {/*  <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/categories"
      >
        <Icon icon="carbon:collapse-categories" />
        <span>categories</span>
      </NavLink>*/}
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/peoples"
      >
        <Icon icon="ph:users-three-fill" />
        <span>peoples</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/discipline"
      >
        <Icon icon="material-symbols:text-snippet-rounded" />
        <span>discipline</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/ShootingRange"
      >
        <Icon icon="eos-icons:troubleshooting" />
        <span>shooting range</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/clubs"
      >
        <Icon icon="bi:microsoft-teams" />
        <span>clubs</span>
      </NavLink>
      {/* <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/contacts"
      >
        <Icon icon="ic:baseline-contact-page" />
        <span>Contacts</span>
      </NavLink>*/}
      {/* <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/results"
      >
        <Icon icon="carbon:result-new" />
        <span>results</span>
      </NavLink> */}
    </div>
  );
}

export default Links;
