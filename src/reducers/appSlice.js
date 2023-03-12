import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    shooters: [],
    teams: [],
    discipline: [],
    compitition: [],
    shootingrange: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
    setShooter: (state, action) => {
      state.shooters = action.payload;
    },
    resetShooter: (state) => {
      state.shooters = null;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    resetTeams: (state) => {
      state.teams = null;
    },
    setDiscipline: (state, action) => {
      state.discipline = action.payload;
    },
    resetDiscipline: (state) => {
      state.discipline = null;
    },

    setCompitition: (state, action) => {
      state.compitition = action.payload;
    },
    resetCompitition: (state) => {
      state.compitition = null;
    },
    setShootingrange: (state, action) => {
      state.shootingrange = action.payload;
    },
    resethootingrange: (state) => {
      state.shootingrange = null;
    },
  },
});

export const {
  resetShootingrange,
  setShootingrange,
  setCompitition,
  resetCompitition,
  resetUser,
  setUser,
  setShooter,
  resetShooter,
  resetDiscipline,
  setTeams,
  resetTeams,
  setDiscipline,
} = appSlice.actions;
export const selectUser = (state) => state.app.user;
export const selectShooter = (state) => state.app.shooters;
export const selectTeams = (state) => state.app.teams;
export const selectDiscipline = (state) => state.app.discipline;
export const selectCompitition = (state) => state.app.compitition;
export const selectShootingrange = (state) => state.app.shootingrange;
export default appSlice.reducer;
