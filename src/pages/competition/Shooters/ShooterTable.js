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
        <p>shooters table</p>
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
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell align="center">date Of Birth</TableCell>
            {/* <TableCell align="center">Discipline</TableCell>
            <TableCell align="center">Shift</TableCell>
            <TableCell align="center">Place</TableCell>
            <TableCell align="center">Notes</TableCell> */}
            <TableCell align="right">actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((rows) =>
            rows.shooters.map((row) => (
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
                <TableCell align="center">{row.dateOfBirth}</TableCell>
                {/* <TableCell align="center">/</TableCell>
                <TableCell align="center">/</TableCell>
                <TableCell align="center">/</TableCell>
                <TableCell align="center">/</TableCell> */}
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
