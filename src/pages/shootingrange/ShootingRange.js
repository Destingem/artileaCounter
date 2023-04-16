import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShootingrange,
  selectTeams,
  setShootingrange,
  setTeams,
} from "../../reducers/appSlice";
import ShootingRangeTable from "./ShootingRangeTable";
import AddShootingRange from "./AddShootingRange";
import DeleteShootingRange from "./deleteShootingRange";
import EditShootingRange from "./EditShootingRange";
import ShootingRangeTableNew from "./shootingrangeTableNew";
import DeleteRangeManager from "./deleteRangeManager";
import AddStuff from "./AddStuff";
import DeleteOther from "./deleteOther";
import DeletePlace from "./deletePlace";
function ShootingRange() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const shootingrange = useSelector(selectShootingrange);
  const [array, setArray] = React.useState(shootingrange);
  const [itemToEditMember, setItemToEditMember] = React.useState(false);
  const [deletemanager, setmanagertodelete] = React.useState(null);
  const [deleteOther, setOthertodelete] = React.useState(null);
  const [membertodelete, setMemberToDelete] = React.useState(null);

  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [itemToEdit, setItemToEdit] = React.useState(false);
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.shootingrange.get());
      dispatch(setShootingrange(result.result));
      setArray(result.result);
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (shootingrange) setArray(shootingrange);
  }, [shootingrange]);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const[search,setSearch]= React.useState("")

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
    // filter data based on search input
    const filteredData = shootingrange.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setArray(filteredData);
  }, [search, shootingrange]);

  return (
    <div data-style="main" className={style.index}>
      <AddShootingRange
        handleClose={handleClose}
        open={open}
        title={"Přidat střelnici"}
      />

      <div data-style="search">
        <TextField
          sx={{ marginRight: "20px" }}
          label="search place"
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
          Přidat střelnici
        </Button>
      </div>
      <ShootingRangeTableNew
        data={array}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
        setItemToEditMember={setItemToEditMember}
        setmanagertodelete={setmanagertodelete}
        setOthertodelete={setOthertodelete}
        setMemberToDelete={setMemberToDelete}
      />
      <DeleteShootingRange item={itemToDelete} setItem={setItemToDelete} />
      <EditShootingRange
        item={itemToEdit}
        setItem={setItemToEdit}
        title={"Edit Item"}
      />
      <AddStuff
        item={itemToEditMember}
        setItem={setItemToEditMember}
        title={"ADD member"}
      />

      <DeleteRangeManager item={deletemanager} setItem={setmanagertodelete} />
      <DeleteOther item={deleteOther} setItem={setOthertodelete} />
      <DeletePlace item={membertodelete} setItem={setMemberToDelete} />
    </div>
  );
}

export default ShootingRange;
