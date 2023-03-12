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

export default function ShootingRangeTable({
  data,
  setItemToDelete,
  setItemToEdit,
}) {
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
        <p>Shooting Range table</p>
        <Icon icon="eos-icons:troubleshooting" fontSize={26} />
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
            <TableCell>Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">PostalCode</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Web</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.postalCode}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.web}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
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
