import { setMessage } from "./messageSlice";

export const AddMessage = (result, dispatch) => {
  const obj = {
    err: result.err,
    message: result.message.message,
    id: result.message.id,
  };
  dispatch(setMessage(obj));
};
