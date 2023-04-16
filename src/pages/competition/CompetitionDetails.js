import { Icon } from "@iconify/react";
import { Button, TextField } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.scss";
import Header from "./Header";
import OverView from "./OverView/OverView";
import Results from "./Results/Results";
import Shifts from "./Shifts/Shift";
import Shooters from "./Shooters/Shooters";
import ShootingRange from "./ShootingRanges/ShootingRange";
import Staff from "./Staff/Staff";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Desiplines from "./Decispline/Desiplines";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function CompetitionDetails() {
  const { id } = useParams();
  const [value, setValues] = React.useState(0);
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };

  return (
    <div className={style.container}>
      <Header />

      <Box sx={{ bgcolor: "white" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChanges}
            sx={{
              bgcolor: "#281c64",
              color: "white",
              "& .Mui-selected": {
                color: "#ff5c35 !important",
                borderBottomColor: "#ff5c35",
              },
              " & .MuiTabs-indicator": {
                borderBottomColor: "#ff5c35 !important",
              },
            }}
            aria-label="basic tabs example"
          >
            <Tab
              label="Přehled"
              sx={{ color: "white", fontWeight: 600 }}
              {...a11yProps(0)}
            />
            <Tab
              label="Střelci"
              sx={{ color: "white", fontWeight: 600 }}
              {...a11yProps(1)}
            />

            <Tab
              label="Střelnice"
              sx={{ color: "white", fontWeight: 600 }}
              {...a11yProps(2)}
            />
            <Tab
              label="Organizátoři"
              sx={{ color: "white", fontWeight: 600 }}
              {...a11yProps(3)}
            />
            <Tab
              label="Disciplíny"
              sx={{ color: "white", fontWeight: 600 }}
              {...a11yProps(4)}
            />
            <Tab
              label="Směny"
              sx={{ color: "white", fontWeight: 600 }}
              {...a11yProps(5)}
            />
            <Tab
              label="Výsledky"
              sx={{ color: "white", fontWeight: 600 }}
              {...a11yProps(6)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <OverView id={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Shooters id={id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ShootingRange id={id} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Staff id={id} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Desiplines id={id} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Shifts id={id} />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Results id={id} />
        </TabPanel>
      </Box>
    </div>
  );
}

export default CompetitionDetails;
