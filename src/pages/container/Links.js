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
        <span>Přehled</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/competition"
      >
        <Icon icon="pixelarticons:tournament" />
        <span>Závody</span>
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
        <span>Lidé</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/discipline"
      >
        <Icon icon="material-symbols:text-snippet-rounded" />
        <span>Disciplíny</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/ShootingRange"
      >
        <Icon icon="eos-icons:troubleshooting" />
        <span>Střelnice</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/app/clubs"
      >
        <Icon icon="bi:microsoft-teams" />
        <span>Kluby</span>
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
