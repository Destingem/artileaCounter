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

export default function ShooterTable({ data, setItemToDelete, setItemToEdit }) {
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
        <p>Přehled osob</p>
        <Icon icon="ph:users-three-fill" fontSize={26} />
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
            <TableCell>Jméno</TableCell>
            <TableCell>Příjmení</TableCell>
            <TableCell align="right">Datum narození</TableCell>
            <TableCell align="right">Země</TableCell>
            <TableCell align="right">Telefon</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Zbrojní průkaz</TableCell>
            <TableCell align="right">Rozhodcovská licence</TableCell>
            <TableCell align="right">Trenérská licence</TableCell>
            <TableCell align="right">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fname}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.lname}
              </TableCell>
              <TableCell align="right">{row.dateOfBirth}</TableCell>
              <TableCell align="right">{row.nationality}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                {row.Identificators.firearmLicence}
              </TableCell>
              <TableCell align="right">
                {row.Identificators.refreeLincense}
              </TableCell>
              <TableCell align="right">
                {row.Identificators.trainerLicense}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  display: "flex",
                  gap: 1,
                  "& svg": {
                    fontSize: 24,
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
