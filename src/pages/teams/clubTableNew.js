import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
import { Toolbar } from "@mui/material";

function Row(props) {
  const { row } = props;
  const { setItemToDelete } = props;
  const { setItemToEdit } = props;
  const { setItemToEditMember } = props;
  const { setMemberToDelete } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              "& svg": {
                fontSize: 22,
                color: "var(--orange-cl)",
              },
            }}
          >
            {open ? (
              <Icon icon="ph:arrow-circle-up" />
            ) : (
              <Icon icon="ph:arrow-circle-down" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.nationality}</TableCell>
        <TableCell align="right">{row.organization}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell
          align="right"
          sx={{
            display: "flex",
            gap: 1,
            paddingBottom: 3,
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
          <Icon
            color="green"
            icon="material-symbols:add-circle"
            onClick={() => {
              setItemToEditMember(row);
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Members
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Jméno</TableCell>
                    <TableCell>Příjmení</TableCell>
                    <TableCell align="right">Datum narození</TableCell>
                    <TableCell align="right">Stát</TableCell>
                    <TableCell align="right">Telefon</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Číslo zbrojního průkazu</TableCell>
                    <TableCell align="right">Licence rozhodčího</TableCell>
                    <TableCell align="right">Trenérská licence</TableCell>
                    <TableCell align="right">Akce</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.members.map((member) => (
                    <TableRow key={member.fname}>
                      <TableCell component="th" scope="row">
                        {member.fname}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {member.lname}
                      </TableCell>
                      <TableCell align="right">{member.dateOfBirth}</TableCell>
                      <TableCell align="right">{member.nationality}</TableCell>
                      <TableCell align="right">{member.phone}</TableCell>
                      <TableCell align="right">{member.email}</TableCell>
                      <TableCell align="right">
                        {member.Identificators.firearmLicence
                          ? member.Identificators.firearmLicence
                          : "/"}
                      </TableCell>
                      <TableCell align="right">
                        {member.Identificators.refreeLincense
                          ? member.Identificators.refreeLincense
                          : "/"}
                      </TableCell>
                      <TableCell align="right">
                        {member.Identificators.trainerLicense
                          ? member.Identificators.trainerLicense
                          : "/"}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          display: "flex",
                          gap: 1,
                          paddingBottom: 3,
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
                            setMemberToDelete({
                              _id: row._id,
                              member: member._id,
                            });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ClubsTable({
  data,
  setMemberToDelete,
  setItemToDelete,
  setItemToEdit,
  setItemToEditMember,
}) {
  console.log(data);
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
        <p>Přehled klubů</p>
        <Icon icon="pixelarticons:tournament" fontSize={26} />
      </Toolbar>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontSize: ".9rem",
                fontWeight: "bold",
              },
            }}
          >
            <TableCell />
            <TableCell>Název klubu</TableCell>
            <TableCell align="right">Země</TableCell>
            <TableCell align="right">Organizace</TableCell>
            <TableCell align="right">Telefon</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row
              key={row._id}
              row={row}
              setItemToDelete={setItemToDelete}
              setItemToEdit={setItemToEdit}
              setItemToEditMember={setItemToEditMember}
              setMemberToDelete={setMemberToDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
