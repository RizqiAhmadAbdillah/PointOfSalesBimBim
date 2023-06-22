import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
