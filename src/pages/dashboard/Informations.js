import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";

function Informations() {
  const [Comp, setComp] = React.useState("");
  const [Club, setClub] = React.useState("");
  const [Shooter, setShooter] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.people.info());
      const result1 = JSON.parse(await window.api.club.info());
      const result2 = JSON.parse(await window.api.compitition.info());
      result2.result.totalcompetitions.forEach(el=>{
        setComp(el.total_competitions)
      })
      result1.result.totalClubs.forEach(el=>{
        setClub(el.total_Clubs)
      })
      result.result.totalpeoples.forEach(el=>{
        setShooter(el.total_peoples)
      })
      // setComp()
      // setClub()
      // setShooter()
    };
    getData();
  }, []);


  return (
    <div data-style="informations-div">
      <NavLink to={"/app/competition"} data-style="card">
        <h3 style={{ color: "var(--purple-cl)" }}>Závody</h3>
        <div data-style="details">
          <Icon color="#612096" icon="pixelarticons:tournament" />
          <p>{Comp}</p>
        </div>
        <i style={{ backgroundColor: "#612096" }} />
      </NavLink>
      <NavLink to={"/app/peoples"} data-style="card">
        <h3 style={{ color: "var(--yellow-cl)" }}>Lidé</h3>
        <div data-style="details">
          <Icon color="#f8c93d" icon="ph:users-three-fill" />
          <p>{Shooter}</p>
        </div>
        <i style={{ backgroundColor: "#f8c93d" }} />
      </NavLink>
      <NavLink  to={"/app/clubs"} data-style="card">
        <h3 style={{ color: "var(--orange-cl)" }}>Kluby</h3>
        <div data-style="details">
          <Icon color="#ff5c35" icon="bi:microsoft-teams" />
          <p>{Club}</p>
        </div>
        <i style={{ backgroundColor: "#ff5c35" }} />
      </NavLink>
      
    </div>
  );
}

export default Informations;
