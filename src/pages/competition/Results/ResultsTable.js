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
import Row from "./Row";
import { buildEntryKey } from "@fullcalendar/core/internal";
export default function ResultsTable({ data, setItemToDelete, setItemToEdit }) {
  const [array,setarray]=React.useState([])
  React.useEffect(()=>{

    data[0]?.shifts.forEach(element => {
      element.shootingSessions.shooter.forEach((el)=>{
        let data ={
          DisciplinesName: element.disciplines[0] ? element.disciplines[0].name : "",
          shifts:element.disciplines[0]? element.disciplines[0].shots.maxShot : "",
          place:element.shootingSessions.place,
          shooterfName:el.fname,
          shooterlName:el.lname,
          dateOfBirth:el.dateOfBirth,
         }

         setarray(arr=>[...arr,data])
      })

    });
  },[])
  console.log(array)
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
        <p>Results</p>
        <Icon icon="carbon:result" fontSize={26} />
      </Toolbar>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <div sx={{ fontSize: 18, fontWeight: 600 }}>
            <h3>VzP40</h3>
          </div>
          <TableRow
            sx={{
              "& th": {
                fontWeight: 700,
                textTransform: "capitalize",
              },
            }}
          >
            <TableCell>Place</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Birthdate</TableCell>
            <TableCell align="center" width={"50%"}>Shifts</TableCell>
            <TableCell align="center">Result</TableCell>
            <TableCell align="center">CT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            array?.map(el=>(
              <Row  data={el}/>
            ))
          }


        </TableBody>
      </Table>
    </TableContainer>
  );
}
