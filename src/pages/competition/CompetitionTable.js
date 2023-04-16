import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Toolbar } from "@mui/material";
import { Icon } from "@iconify/react";
//import Chip from "@mui/material/Chip";
import {Badge, Chip} from "@mantine/core";
import { useNavigate, Navigate } from "react-router-dom";
import {BiShow} from "react-icons/bi";

const today = new Date();
const todayAsString = today.toLocaleDateString("default", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
export default function CompetitionTable({
  data,
  setItemToDelete,
  setItemToEdit,
}) {
  const navigate = useNavigate();
  const [redirect, setRedirection] = React.useState(null);
  if (redirect) return <Navigate replace to={redirect} />;
  return (
    <TableContainer component={Paper}>
      <Toolbar
        sx={{
          backgroundColor: "var(--orange-cl)",
          color: "var(--light-cl)",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <p>Přehled závodů</p>
        <Icon icon="pixelarticons:tournament" fontSize={26} />
      </Toolbar>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontWeight: 700,
                textTransform: "capitalize",
              },
            }}
          >
            <TableCell align="center">Název závodů</TableCell>
            <TableCell align="center">Popis závodu</TableCell>
            <TableCell align="center">Datum startu</TableCell>
            <TableCell align="center">Konec závodu</TableCell>
            <TableCell align="center">Stav</TableCell>
            <TableCell align="center">Zobrazit</TableCell>
            <TableCell align="center">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.description}
              </TableCell>
              <TableCell align="center">{row.startDate}</TableCell>
              <TableCell align="center">{row.endDate}</TableCell>
              <TableCell align="center">
                <Badge
                contrastText="white"
                  
                color={
                  new Date(row.startDate).getTime() <=
                    new Date(todayAsString).getTime() &&
                  new Date(todayAsString).getTime() <
                    new Date(row.endDate).getTime()
                    ? "green"
                    : new Date(todayAsString).getTime() >
                      new Date(row.endDate).getTime()
                    ? "red"
                    : new Date(todayAsString).getTime() <
                      new Date(row.startDate).getTime()
                    ? "yellow"
                    : " yellow"
                }
                >{
                  new Date(row.startDate).getTime() <=
                    new Date(todayAsString).getTime() &&
                  new Date(todayAsString).getTime() <
                    new Date(row.endDate).getTime()
                    ? "Probíhá"
                    : new Date(todayAsString).getTime() >
                      new Date(row.endDate).getTime()
                    ? "Skončil"
                    : new Date(todayAsString).getTime() <
                      new Date(row.startDate).getTime()
                    ? "Nezačal"
                    : "Nezačal"
                }</Badge>
              </TableCell>
              <TableCell align="center">
                <Chip
                contrastText="white"
                  label="View"
                  color="primary"
                  onClick={() => {
                    setRedirection("/competition/" + row._id);
                  }}
                ><BiShow /></Chip>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  display: "flex",
                  gap: 1,
                  "& svg": {
                    fontSize: 24,
                    marginTop: 1.1,
                    cursor: "pointer",
                  },
                }}
              >
                <Icon
                  color="#ff5c35"
                  icon="mdi:delete-circle"
                  onClick={() => {
                    setItemToDelete(row);
                  }}
                />
                <Icon
                  color="#612096"
                  icon="material-symbols:edit-document-rounded"
                  onClick={() => {
                    setItemToEdit(row);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
