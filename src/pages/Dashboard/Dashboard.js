import React, { useState, useEffect } from "react";
import axios from "axios";
import Consumer from "./Consumer";
import Admin from "./Admin";
import "./Dashboard.css";

const URL = "http://localhost:7890";

export default function Dashboard({ id, type }) {
  return (
    <div className="dashboard">
      {type === "teacher" ? (
        <Admin teacherId={id} type={type} />
      ) : (
        <Consumer consumerId={id} />
      )}
    </div>
  );
}
