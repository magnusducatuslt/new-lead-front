import React, { useState, useEffect } from "react";
import axios from "axios";
import Consumer from "./Consumer";
import Admin from "./Admin";

const URL = "http://localhost:5000";

export default function Dashboard({ id, type }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {type === "teacher" ? (
        <Admin teacherId={id} />
      ) : (
        <Consumer consumerId={id} />
      )}
      <br />
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        logout
      </button>
    </div>
  );
}
