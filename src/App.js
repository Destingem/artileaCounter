import style from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Container from "./pages/container/Container";
import Alert from "./reducers/message/Alert";
import CompetitionDetails from "./pages/competition/CompetitionDetails";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      contrastText: '#fff',

    },
    contrastText: '#fff',
  },
});

function App() {
  return (
    <div className={style.index}>
      <div data-style="title"></div>
      <Alert />
     <ThemeProvider theme={theme}>
   
      <ModalsProvider>
      <Notifications />
     <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/app/*" element={<Container />} />
        <Route path="/competition/:id" element={<CompetitionDetails />} />
      </Routes>
      </ModalsProvider>
   
      </ThemeProvider>
    </div>
  );
}

export default App;
