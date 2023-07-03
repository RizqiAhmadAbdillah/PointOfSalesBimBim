import { createSlice } from "@reduxjs/toolkit";

export const NAVS = {
  DASHBOARD: 1,
  TRANSACTION: 2,
  SETTINGS: 3,
};

const initialState = {
  currentNav: NAVS.DASHBOARD,
};

export const navSlice = createSlice({
  name: "nav",
  initialState: { ...initialState },
  reducers: {
    setToDashboard: (state) => {
      state.currentNav = NAVS.DASHBOARD;
    },
    setToTransaction: (state) => {
      state.currentNav = NAVS.TRANSACTION;
    },
    setToSettings: (state) => {
      state.currentNav = NAVS.SETTINGS;
    },
  },
});
export const { setToDashboard, setToTransaction, setToSettings } =
  navSlice.actions;
export default navSlice.reducer;
