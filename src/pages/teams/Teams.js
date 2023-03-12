import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import style from "./style.module.scss";
import ClubsTable from "./clubTableNew";
import AddTeam from "./AddTeam";
import AddTeamMember from "./AddTeamMember";
import { useDispatch, useSelector } from "react-redux";
import { selectTeams, setTeams } from "../../reducers/appSlice";
import DeleteTeam from "./deleteTeam";
import EditTeam from "./EditTeam";
import DeletememberFromtheTeam from "./deletememberFromtheTeam";

function Teams() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const [array, setArray] = React.useState(teams);
  const[search,setSearch]= React.useState("")
  // delete item state
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [memberToDelete, setMemberToDelete] = React.useState(null);

  // edit item state
  const [itemToEdit, setItemToEdit] = React.useState(false);
  const [itemToEditMember, setItemToEditMember] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.club.get());
      dispatch(setTeams(result.result));
    };
    getData();
  }, [dispatch]);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };


  React.useEffect(() => {
    if (teams) setArray(teams);
  }, [teams]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
    // filter data based on search input
    const filteredData = teams.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setArray(filteredData);
  }, [search, teams]);
  return (
    <div data-style="main" className={style.index}>
      <AddTeam handleClose={handleClose} open={open} title={"ADD CLUB"} />

      <div data-style="search">
        <TextField
          sx={{ marginRight: "20px" }}
          label="search club"
          variant="outlined"
          id="search-input"
          size="small"
          value={search}
          onChange={handleSearchChange}
        />

        <Button
          variant="contained"
          size="medium"
          startIcon={<Icon icon="material-symbols:add-circle-outline" />}
          onClick={handleClose}
        >
          add club
        </Button>
      </div>

      <ClubsTable
        data={array}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
        setItemToEditMember={setItemToEditMember}
        setMemberToDelete={setMemberToDelete}
      />
      <DeleteTeam item={itemToDelete} setItem={setItemToDelete} />
      <EditTeam item={itemToEdit} setItem={setItemToEdit} title={"Edit club"} />
      <AddTeamMember
        item={itemToEditMember}
        setItem={setItemToEditMember}
        title={"ADD member"}
      />
      <DeletememberFromtheTeam
        item={memberToDelete}
        setItem={setMemberToDelete}
      />
    </div>
  );
}

export default Teams;
