import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Toolbar } from "@mui/material";
import { Chip } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useNavigate, Navigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function RecentResultTable({
  data,
  setItemToDelete,
  setItemToEdit,
}){
  const today = new Date();
  const todayAsString = today.toLocaleDateString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
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
      <p>Competition table</p>
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
          <TableCell align="center">Compition Name</TableCell>
          <TableCell align="center">Competition description</TableCell>
          <TableCell align="center">Starting DAte</TableCell>
          <TableCell align="center">Ending Date</TableCell>
          <TableCell align="center">Status </TableCell>
          <TableCell align="center">View</TableCell>
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
              <Chip
             
                
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
                    ? "Ongoing"
                    : new Date(todayAsString).getTime() >
                      new Date(row.endDate).getTime()
                    ? "Ended"
                    : new Date(todayAsString).getTime() <
                      new Date(row.startDate).getTime()
                    ? "Wating"
                    : "Wating "
                }</Chip>
            </TableCell>
            <TableCell align="center">
              <Chip
              
               
                color="green"
                onClick={() => {
                  setRedirection("/competition/" + row._id);
                }}
              >View</Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}
