import { Icon } from "@iconify/react";
import { Button, Modal, Box } from "@mui/material";
import React from "react";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import { setDiscipline } from "../../reducers/appSlice";
import { AddMessage } from "../../reducers/message/AddMessage";

function DeleteDiscipline({ item, setItem }) {
  const dispatch = useDispatch();
  const cancel = () => {
    setItem(null);
  };
  const confirme = async () => {
    // delete the selected item
    const result = JSON.parse(
      await window.api.discipline.delete({ _id: item._id })
    );
    AddMessage(result, dispatch);
    //   if (result.err) {
    //     if (result.result === undefined) return dispatch(setUser(null));
    //     return addMessage(result, dispatch);
    //   }
    // show message if item was deleted successfully
    //   addMessage(result, dispatch);
    // get items to refresh the old items
    const items = JSON.parse(await window.api.discipline.get());
    // if (items.err) return addMessage(items, dispatch);
    dispatch(setDiscipline(items.result));
    // reset the selected item to delete and close the modal
    cancel();
  };

  return (
    <Modal
      open={item ? true : false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.delete}>
        <h3>{item?.name}</h3>
        <p>Opravdu chcete odstranit disciplínu ?</p>
        <div>
          <Button variant="contained" onClick={cancel}>
            Ne, zrušit
          </Button>
          <Button variant="contained" color="error" onClick={confirme}>
            Ano, chci smazat disciplínu
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteDiscipline;
