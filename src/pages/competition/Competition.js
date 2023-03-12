import { Icon } from "@iconify/react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import React from "react";
import CompetitionTable from "./CompetitionTable";
import AddCompetition from "./AddCompetition";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../reducers/appSlice";
import DeleteComp from "./DeleteComp";
import EditComp from "./EditComp";
function Competition() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const competition = useSelector(selectCompitition);
  const [array, setArray] = React.useState(competition);

  const [itemToDelete, setItemToDelete] = React.useState(null);
  // edit item state
  const [itemToEdit, setItemToEdit] = React.useState(false);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.compitition.get());
      dispatch(setCompitition(result.result));
      console.log(result.result);
    };
    getData();
  }, [dispatch]);
  React.useEffect(() => {
    if (competition) setArray(competition);
  }, [competition]);

  const[search,setSearch]= React.useState("")

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
    // filter data based on search input
    const filteredData = competition.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setArray(filteredData);
  }, [search, competition]);

  return (
    <div data-style="main" className={style.index}>
      <div data-style="search">
        <div data-style="add-section">
          <TextField
            sx={{ marginRight: "20px" }}
            label="search compition"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
          />

          <Button
            variant="contained"
            size="small"
            onClick={handleClose}
            startIcon={<Icon icon="material-symbols:add-circle-outline" />}
          >
            add compition
          </Button>
        </div>
      </div>
      <AddCompetition
        handleClose={handleClose}
        open={open}
        title={"ADD NEW COMPETITION"}
      />

      <CompetitionTable
        data={array}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
      />
      <DeleteComp item={itemToDelete} setItem={setItemToDelete} />
      <EditComp item={itemToEdit} setItem={setItemToEdit} title={"Edit Item"} />
    </div>
  );
}

export default Competition;
