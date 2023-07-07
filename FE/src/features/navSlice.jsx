import { createSlice } from "@reduxjs/toolkit";

export const NAVS = {
  DASHBOARD: 1,
  TRANSACTION: 2,
  PRODUCTS: 3,
  SETTINGS: 4,
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
    setToProducts: (state) => {
      state.currentNav = NAVS.PRODUCTS;
    },
    setToSettings: (state) => {
      state.currentNav = NAVS.SETTINGS;
    },
  },
});
export const {
  setToDashboard,
  setToTransaction,
  setToProducts,
  setToSettings,
} = navSlice.actions;
export default navSlice.reducer;
