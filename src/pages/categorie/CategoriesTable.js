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

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

export default function CategoriesTable() {
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
        <p>categories table</p>
        <Icon icon="carbon:collapse-categories" fontSize={26} />
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
            <TableCell>date</TableCell>
            <TableCell align="right">location</TableCell>
            <TableCell align="right">number of participants</TableCell>
            <TableCell align="right">actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
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
                <Icon color="#ff5c35" icon="mdi:delete-circle" />
                <Icon
                  color="#612096"
                  icon="material-symbols:edit-document-rounded"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
