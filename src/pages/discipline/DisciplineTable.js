import * as React from "react";
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

function Row({
  row,
  setItemToDelete,
  setItemToEdit,
  setItemToEditMember,
  setMemberToDelete,
}) {
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
        <TableCell>{row.defedesion}</TableCell>
        <TableCell
          align="right"
          sx={{
            display: "flex",
            gap: 1,
            minHeight: "100%",
            padding: "20px",
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
      {row?.final?.doesHaveFinal ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{
                    bgcolor: "#612096",
                    color: "white",
                    width: "250px",
                    textAlign: "center",
                  }}
                >
                  Finále
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Má finále?</TableCell>
                      <TableCell align="center">Název finále</TableCell>
                      <TableCell align="center">Čas</TableCell>
                      <TableCell align="center">Je omezen počet ran?</TableCell>
                      <TableCell align="center">Počet ran</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        {row.final.doesHaveFinal ? "yes" : "no"}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.final.timeSequences.name
                          ? row.final.timeSequences.name
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {row.final.timeSequences.time
                          ? row.final.timeSequences.time
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {row.final.timeSequences.isnumOfShotsLimited
                          ? "yes"
                          : "no"}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {row.final.timeSequences.numberOfShots
                          ? row.final.timeSequences.numberOfShots
                          : "/"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        ""
      )}

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  bgcolor: "#612096",
                  color: "white",
                  width: "250px",
                  textAlign: "center",
                }}
              >
                Zbraně
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Pistolová disciplína</TableCell>
                    <TableCell align="center">Pušková disciplína</TableCell>
                    <TableCell align="center">Kušová disciplína</TableCell>
                    <TableCell align="center">Disciplína pro jinou zbraň</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {row.guns.pistol ? "yes" : "no"}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.guns.rifle ? "yes" : "no"}
                    </TableCell>
                    <TableCell align="center">
                      {row.guns.crossbow ? "yes" : "no"}
                    </TableCell>
                    <TableCell align="center">{row.guns.other}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  bgcolor: "#612096",
                  color: "white",
                  width: "250px",
                  textAlign: "center",
                }}
              >
                Shots
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Počet ran v závodu</TableCell>
                    <TableCell align="center">Je omezen nástřel?</TableCell>
                    <TableCell align="center">Maximální počet ran v nástřelu</TableCell>
                    <TableCell align="center">Nejvyšší možný zásah</TableCell>
                    <TableCell align="center">Nejnižší možný zásah</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {row.shots.competitionShots}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.shots.isLimitedPreparation ? "yes" : "no"}
                    </TableCell>
                    <TableCell align="center">
                      {row.shots.preparationLimit}
                    </TableCell>
                    <TableCell align="center">{row.shots.maxShot}</TableCell>
                    <TableCell align="center">{row.shots.minShot}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h4" gutterBottom component="div">
                Časové limity
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  bgcolor: "#612096",
                  color: "white",
                  width: "250px",
                  textAlign: "center",
                }}
              >
                Na přetáčecí terč
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Celkem</TableCell>
                    <TableCell align="center">pro přípravu</TableCell>
                    <TableCell align="center">pro nástřel</TableCell>
                    <TableCell align="center">pro závod</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.time.onRegular ? (
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        {row.time.onRegular.total}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.time.onRegular.forPreparation}
                      </TableCell>
                      <TableCell align="center">
                        {row.time.onRegular.forPractice}
                      </TableCell>
                      <TableCell align="center">
                        {row.time.onRegular.forCompetition}
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  bgcolor: "#612096",
                  color: "white",
                  width: "250px",
                  textAlign: "center",
                }}
              >
                Na elektronický terč
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Celkem</TableCell>
                    <TableCell align="center">pro přípravu</TableCell>
                    <TableCell align="center">pro nástřel</TableCell>
                    <TableCell align="center">pro závod</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.time.onElectronic ? (
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        {row.time.onElectronic.total}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.time.onElectronic.forPreparation}
                      </TableCell>
                      <TableCell align="center">
                        {row.time.onElectronic.forPractice}
                      </TableCell>
                      <TableCell align="center">
                        {row.time.onElectronic.forCompetition}
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  bgcolor: "#612096",
                  color: "white",
                  width: "250px",
                  textAlign: "center",
                }}
              >
                Na posuvný terč
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Celkem</TableCell>
                    <TableCell align="center">pro přípravu</TableCell>
                    <TableCell align="center">pro nástřel</TableCell>
                    <TableCell align="center">pro závod</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.time.onMigratory ? (
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        {row.time.onMigratory.total}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.time.onMigratory.forPreparation}
                      </TableCell>
                      <TableCell align="center">
                        {row.time.onMigratory.forPractice}
                      </TableCell>
                      <TableCell align="center">
                        {row.time.onMigratory.forCompetition}
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  bgcolor: "#612096",
                  color: "white",
                  width: "250px",
                  textAlign: "center",
                }}
              >
                Jiný způsob
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Celkem</TableCell>
                    <TableCell align="center">pro přípravu</TableCell>
                    <TableCell align="center">pro nástřel</TableCell>
                    <TableCell align="center">pro závod</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.time?.other?.map((details, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="center">
                        {details.total}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {details.forPreparation}
                      </TableCell>
                      <TableCell align="center">
                        {details.forPractice}
                      </TableCell>
                      <TableCell align="center">
                        {details.forCompetition}
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
                              team: details,
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

export default function DisciplineTable({
  descipline,
  setItemToDelete,
  setItemToEdit,
  setItemToEditMember,
  setMemberToDelete,
}) {
  console.log(descipline);
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
        <p>Přehled disciplín</p>
        <Icon icon="material-symbols:text-snippet-rounded" fontSize={26} />
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
            <TableCell>Název disciplíny</TableCell>
            <TableCell>Organizace</TableCell>
            <TableCell align="right">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {descipline.map((row) => (
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
