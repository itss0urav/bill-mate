import React from "react";
import BillForm from "./BillForm";
import { colors } from "@mui/material";

const App = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Bill Mate</h1>
      </div>
      <BillForm />
    </div>
  );
};

export default App;
