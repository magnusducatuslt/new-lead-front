import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Preferences from "./pages/Preferences/Preferences";

function App() {
  const user = localStorage.getItem("user_platform");
  if (!user) {
    return <Login />;
  }
  const parsed = JSON.parse(user);
  console.log(parsed);
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard id={parsed.id} type={parsed.type} />}
          ></Route>
          <Route
            path="/preferences"
            element={<Preferences id={parsed.id} type={parsed.type} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
