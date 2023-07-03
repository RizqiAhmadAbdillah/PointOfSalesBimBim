import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardNav: true,
  transactionNav: false,
  settingsNav: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState: { ...initialState },
  reducers: {
    setToDashboard: () => {
      return { ...initialState };
    },
    setToTransaction: (state) => {
      state.dashboardNav = false;
      state.transactionNav = true;
      state.settingsNav = false;
    },
    setToSettings: (state) => {
      state.dashboardNav = false;
      state.transactionNav = false;
      state.settingsNav = true;
    },
  },
});
export const { setToDashboard, setToTransaction, setToSettings } =
  navSlice.actions;
export default navSlice.reducer;
