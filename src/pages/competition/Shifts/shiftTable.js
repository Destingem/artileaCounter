import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { Toolbar } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ShiftTable({ array }) {
  const [unique, setUnique] = useState(null);
  const classes = useStyles();
console.log(array);
  React.useEffect(() => {
    let shifts = [];

    if (array) {
      array.forEach((element) => {
        element.shifts.forEach((shift) => {
          if (!shifts.some((s) => s.shiftNumber === shift.shiftNumber)) {
            shifts.push(shift);
          }
        });
      });
    }

    setUnique(shifts);
  }, [array]);

  return (
    <>
      <TableContainer component={Paper}>
      {console.log(unique)}
        {unique?.map((el, index) => (
          <>
            <Toolbar
              key={index}
              sx={{
                marginTop: 1,
                backgroundColor: "var(--orange-cl)",
                color: "var(--light-cl)",
                fontSize: "0.9rem",
                fontWeight: "bold",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                minHeight: "34px !important",
                gap: 1,
              }}
            >
              <p>
                {"Shift " +
                  el.shiftNumber +
                  " " +
                  el.start[0] +
                  " / " +
                  el.end[0]}
              </p>
            </Toolbar>
            <Table className={classes.table} aria-label="custom table">
              <TableHead>
                {el?.shootingSessions.map((element, index) => (
                  
                  <TableCell key={index} align="center">
                    {element.place}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody>
                <TableRow>
                  {el?.shootingSessions.map((ell, index) => {
                    console.log(ell);
                    return (
                      <>
                        <TableCell align="center">
                          <ul>
                            <li>
                              <h4>{ell?.discipline?.name}</h4>
                            </li>
                            <li> {ell?.shooter?.fname + " " + ell?.shooter?.lname}</li>
                          </ul>
                        </TableCell>
                      </>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </>
        ))}
      </TableContainer>
    </>
  );
}
