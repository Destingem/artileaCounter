import { Icon } from "@iconify/react";
import React from "react";

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
      <div data-style="card">
        <h3 style={{ color: "var(--purple-cl)" }}>compitions</h3>
        <div data-style="details">
          <Icon color="#612096" icon="pixelarticons:tournament" />
          <p>{Comp}</p>
        </div>
        <i style={{ backgroundColor: "#612096" }} />
      </div>
      <div data-style="card">
        <h3 style={{ color: "var(--yellow-cl)" }}>shooters</h3>
        <div data-style="details">
          <Icon color="#f8c93d" icon="ph:users-three-fill" />
          <p>{Shooter}</p>
        </div>
        <i style={{ backgroundColor: "#f8c93d" }} />
      </div>
      <div data-style="card">
        <h3 style={{ color: "var(--orange-cl)" }}>teams</h3>
        <div data-style="details">
          <Icon color="#ff5c35" icon="bi:microsoft-teams" />
          <p>{Club}</p>
        </div>
        <i style={{ backgroundColor: "#ff5c35" }} />
      </div>
    </div>
  );
}

export default Informations;
