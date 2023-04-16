import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import style from "./style.module.scss";
import DisciplineTable from "./DisciplineTable";
import EditDiscipline from "./EditDiscipline";
import { useDispatch, useSelector } from "react-redux";
import { selectDiscipline, setDiscipline } from "../../reducers/appSlice";
import DeleteDiscipline from "./deleteDiscipline";
import AddStuff from "./AddStuff";
import AddDiscipline from "./AddDiscipline";
import DeleteOther from "./deleteTeam";

function Discipline() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [itemToEditMember, setItemToEditMember] = React.useState(false);
  const discipline = useSelector(selectDiscipline);
  const [array, setArray] = React.useState([]);
  const [itemToEdit, setItemToEdit] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [memberToDelete, setMemberToDelete] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.discipline.get());
      dispatch(setDiscipline(result.result));
      console.log(result);
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (discipline) setArray(discipline);
  }, [discipline]);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const[search,setSearch]= React.useState("")

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
    
    // filter data based on search input
    const filteredData = discipline.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.defedesion.toLowerCase().includes(search.toLowerCase())
    );
    setArray(filteredData);
  }, [search, discipline]);
  return (
    <div data-style="main" className={style.index}>
      <AddDiscipline
        handleClose={handleClose}
        open={open}
        title={"Přidat disciplínu"}
      />

      <div data-style="search">
        <TextField
          sx={{ marginRight: "20px", width: "30%" }}
          label="Vyhledat disciplínu"
          variant="outlined"
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
          Přidat disciplínu
        </Button>
      </div>
      <DisciplineTable
        setItemToEditMember={setItemToEditMember}
        descipline={array}
        setMemberToDelete={setMemberToDelete}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
      />
      <DeleteDiscipline item={itemToDelete} setItem={setItemToDelete} />
      <AddStuff
        item={itemToEditMember}
        setItem={setItemToEditMember}
        title={"ADD member"}
      />
      <EditDiscipline
        item={itemToEdit}
        setItem={setItemToEdit}
        title={"Upravit disciplínu"}
      />
      <DeleteOther item={memberToDelete} setItem={setMemberToDelete} />
    </div>
  );
}

export default Discipline;
