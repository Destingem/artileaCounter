import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../reducers/appSlice";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
function Header({ path }) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div data-style="header">
      <div data-style="left">
        <div
          onClick={() => {
            navigate(-1);
          }}
          style={{ display: "flex" }}
        >
          <Icon icon="material-symbols:text-select-move-back-word-rounded" />
        </div>
        <h3>{"Detaily závodu"}</h3>
      </div>
      <div>
        <Link to= "/app" data-style="user">
          <span></span>
          <AiFillHome />
        </Link>
        <Link to="/" style={{ display: "flex" }}>
          <Icon icon="ph:sign-out-bold" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
