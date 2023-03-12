import { Icon } from "@iconify/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage, selectMessage } from "./messageSlice";
import style from "./style.module.scss";

function Alert() {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (message) {
      setMessages((prev) => [...prev, message]);
      dispatch(resetMessage());
    }
  }, [message, dispatch]);

  return (
    <ul className={style.index}>
      {messages.map((val) => (
        <Li message={val} setMessages={setMessages} key={val.id} />
      ))}
    </ul>
  );
}

const Li = ({ message, setMessages }) => {
  setTimeout(() => {
    setMessages((prev) => prev.filter((val) => val.id !== message.id));
  }, 3000);

  return (
    <li data-err={`${message.err}`}>
      {!message.err ? (
        <Icon icon="material-symbols:check-box-rounded" />
      ) : (
        <Icon icon="ri:error-warning-fill" />
      )}
      <span>{message.message}</span>
    </li>
  );
};

export default Alert;
