import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import AddShooter from "./AddShooter";
import Search from "./Search";
import ShooterTable from "./ShooterTable";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectShooter, setShooter } from "../../reducers/appSlice";
import DeleteShooter from "./DeleteShooter";
import EditShooter from "./EditShooter";
function Shooter() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const shooters = useSelector(selectShooter);
  const [array, setArray] = React.useState(shooters);

  const [itemToDelete, setItemToDelete] = React.useState(null);
  // edit item state
  const [itemToEdit, setItemToEdit] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.people.get());
      dispatch(setShooter(result.result));
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (shooters) setArray(shooters);
  }, [shooters]);

  // open or close shooter modal
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const[search,setSearch]= React.useState("")

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
    // filter data based on search input
    const filteredData = shooters.filter((item) =>
      item.lname.toLowerCase().includes(search.toLowerCase()) ||
      item.fname.toLowerCase().includes(search.toLowerCase())
    );
    setArray(filteredData);
  }, [search, shooters]);
  return (
    <div data-style="main" className={style.index}>
      <AddShooter handleClose={handleClose} open={open} title={"ADD People"} />
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
          add People
        </Button>
      </div>
      <ShooterTable
        data={array}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
      />
      <DeleteShooter item={itemToDelete} setItem={setItemToDelete} />
      <EditShooter
        item={itemToEdit}
        setItem={setItemToEdit}
        title={"Edit Item"}
      />
    </div>
  );
}

export default Shooter;
