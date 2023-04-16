import { Icon } from "@iconify/react";
import { Button, Group } from "@mantine/core";
import React from "react";
import ShooterTable from "./ShooterTable";
import style from "./style.module.scss";
//import AddShooter from "./AddShooter";
import AddShooter from "../../shooter/AddShooter";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../../reducers/appSlice";
import DeleteShooter from "./DeleteShooter";
import AddExistingShooter from "./AddShooter";
function Shooters({ id }) {
  const [open, setOpen] = React.useState({create: false, existing: false});
  const dispatch = useDispatch();
  const comp = useSelector(selectCompitition);
  const [array, setArray] = React.useState(
    comp.filter((el) => {
      return el._id === id;
    })
  );
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [itemToEdit, setItemToEdit] = React.useState(false);
  const handleChange = (e) => {
    if(e === "create") setOpen({create: !open.create, existing: false});
    if(e === "existing") setOpen({create: false, existing: !open.existing});
    
  };

  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.compitition.get());
      dispatch(setCompitition(result.result));
    };
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    if (comp)
      setArray(
        comp.filter((el) => {
          return el._id === id;
        })
      );
  }, [comp, id]);
  return (
    <div data-style="main" className={style.index}>
      <div data-style="search">
        <div data-style="add-section">
        <AddShooter  id={id} handleClose={()=> {handleChange("create")}} open={open.create} title={"ADD People"} />
        
          <AddExistingShooter
            handleClose={()=> {handleChange("existing")}}
            open={open.existing}
            title={"add shooter"}
            id={id}
          />
          <Group>
          <Button
          color="blue.8"
            component="button"
            variant="filled"
            size="md"
            onClick={()=> {handleChange("create")}}
            startIcon={<Icon icon="material-symbols:add-circle-outline" />}
          >
            Přidat nového střelce
          </Button>
          <Button
            variant="filled"
            component="button"
            color="cyan.6"
            size="md"
            onClick={()=> {handleChange("existing")}}
            startIcon={<Icon icon="material-symbols:add-circle-outline" />}
          >
            Přidat existujícího střelce
          </Button>
          </Group>
        </div>
      </div>
      <ShooterTable
        data={array}
        setItemToDelete={setItemToDelete}
        setItemToEdit={setItemToEdit}
      />
      <DeleteShooter item={itemToDelete} setItem={setItemToDelete} id={id} />
    </div>
  );
}

export default Shooters;
