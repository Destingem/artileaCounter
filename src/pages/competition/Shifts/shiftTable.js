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
                  el.shiftRefrees.start +
                  " / " +
                  el.shiftRefrees.end}
              </p>
            </Toolbar>
            <Table className={classes.table} aria-label="custom table">
              <TableHead>
                {el.shootingSessions.shooter.map((ell, index) => (
                  <TableCell key={index} align="center">
                    {el.shootingSessions.place}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody>
                <TableRow>
                  {el.shootingSessions.shooter.map((ell, index) => {
                    return (
                      <>
                        <TableCell align="center">
                          <ul>
                            <li>
                              <h4>{el.shootingSessions.discipline[0].name}</h4>
                            </li>
                            <li> {ell.fname + " " + ell.lname}</li>
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
