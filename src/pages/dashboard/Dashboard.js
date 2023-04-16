import React from "react";
import Calender from "./Calender";
import Informations from "./Informations";
import RecentResultTable from "./RecentResult";
import CompetitionTable from "../competition/CompetitionTable";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCompitition, setCompitition } from "../../reducers/appSlice";
import AdditionalInfo from "./AdditionalInfo";

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const competition = useSelector(selectCompitition);
  const [array, setArray] = React.useState(competition);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  React.useEffect(() => {
    const getData = async () => {
      const result = JSON.parse(await window.api.compitition.get());
      dispatch(setCompitition(result.result));
     
    };
    getData();
  }, [dispatch]);
  React.useEffect(() => {
    if (competition) setArray(competition);
  }, [competition]);
  return (
    <div data-style="main" className={style.index}>
      <Informations />
      <AdditionalInfo />
      <div style={{marginTop:20, marginBottom:30}}>
      <RecentResultTable
             data={array}

      />
      </div>
      <Calender />
    </div>
  );
}

export default Dashboard;
