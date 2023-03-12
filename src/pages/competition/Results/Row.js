import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Toolbar } from "@mui/material";
import { Icon } from "@iconify/react";



export default function Row({ data }) {
    const [result,setResult]=React.useState(0);
    const [textFieldValues, setTextFieldValues] = React.useState([]);

    const handleTextFieldChange = (event, index) => {
        const newValues = [...textFieldValues];
        newValues[index] = event.target.value;
        setTextFieldValues(newValues);

        const total = newValues.reduce((sum, value) => sum + parseFloat(value), 0);
        setResult((total / data.shifts).toFixed(2));
    };

  return (
    <>

            <TableRow
              key={data._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.place}
              </TableCell>
              <TableCell align="center">{data.shooterfName +" "+ data.shooterlName}</TableCell>
              <TableCell align="center">{data.dateOfBirth}</TableCell>
              <TableCell align="center" style={{display:"flex"}}>
              {[...Array(data.shifts)].map((_, i) => (
            <TextField key={i}  size="small" type="number"   defaultValue={0} inputProps={{ min: 0 }} onChange={(event) => handleTextFieldChange(event, i)}
            />
          ))}
              </TableCell>
              <TableCell align="center">{result}</TableCell>
              <TableCell align="center">{result}</TableCell>

            </TableRow>

        </>
  );
}
