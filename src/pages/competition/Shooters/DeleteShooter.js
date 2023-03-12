import { Icon } from "@iconify/react";
import { Button, Modal, Box } from "@mui/material";
import React from "react";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../../reducers/message/AddMessage";
import { setCompitition } from "../../../reducers/appSlice";

function DeleteShooter({ item, setItem, id }) {
  const dispatch = useDispatch();
  const cancel = () => {
    setItem(null);
  };
  const confirme = async () => {
    // delete the selected item
    const result = JSON.parse(
      await window.api.compitition.deleteshooters({ _id: id, data: item._id })
    );
    AddMessage(result, dispatch);
    //   if (result.err) {
    //     if (result.result === undefined) return dispatch(setUser(null));
    //     return addMessage(result, dispatch);
    //   }
    // show message if item was deleted successfully
    //   addMessage(result, dispatch);
    // get items to refresh the old items
    const items = JSON.parse(await window.api.compitition.get());
    // if (items.err) return addMessage(items, dispatch);
    dispatch(setCompitition(items.result));
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
        <p>do you really want to delete this item ?</p>
        <div>
          <Button variant="contained" onClick={cancel}>
            no, cancel
          </Button>
          <Button variant="contained" color="error" onClick={confirme}>
            yes delete it
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteShooter;
