import React from "react";
import { Route, Routes } from "react-router-dom";
import Competition from "../competition/Competition";
import Dashboard from "../dashboard/Dashboard";
import Reasult from "../result/Reasult";
import Shooter from "../shooter/Shooter";
import Teams from "../teams/Teams";
import ShootingRange from "../shootingrange/ShootingRange";
import Discipline from "../discipline/Discipline";
import CompetitionDetails from "../competition/CompetitionDetails";

function RoutesContainer() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/competition" element={<Competition />} />
      <Route path="/competition/:id" element={<CompetitionDetails />} />
      <Route path="/peoples" element={<Shooter />} />
      <Route path="/discipline" element={<Discipline />} />
      <Route path="/ShootingRange" element={<ShootingRange />} />
      <Route path="/clubs" element={<Teams />} />
      <Route path="/results" element={<Reasult />} />
    </Routes>
  );
}

export default RoutesContainer;
/*      <Route path="/categories" element={<Categories />} />

      <Route path="/contacts" element={<Contact />} />
*/
