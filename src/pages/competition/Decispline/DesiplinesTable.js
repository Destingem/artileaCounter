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

export default function DesiplinesTable({
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
        <p>Decisplines table</p>
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
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Federation</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((rows) =>
            rows.disciplines.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.defedesion}
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
