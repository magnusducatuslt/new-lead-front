import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

async function signIn(credentials) {
  const response = await axios.post(
    "http://localhost:5000/auth/find",
    credentials
  );
  if (response.data) {
    localStorage.setItem("user_platform", JSON.stringify(response.data));
    window.location.href = "/dashboard";
  }
  return response.data;
}

async function signUp(credentials) {
  const response = await axios.post(
    "http://localhost:5000/auth/create",
    credentials
  );
  if (response.data) {
    localStorage.setItem("user_platform", JSON.stringify(response.data));
    window.location.href = "/dashboard";
  }
  return response.data;
}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState("teacher");

  const [isSignUp, setSignUp] = useState(true);

  return (
    <div className="login-wrapper">
      {isSignUp ? (
        <div>
          <h1>Please Sign Up</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUp({ login: username, password, type });
            }}
          >
            <label>
              <p>Username</p>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <p>Who you are</p>
              <div>
                <label>teacher</label>
                <input
                  type="radio"
                  value="teacher"
                  checked={type === "teacher" ? true : false}
                  onChange={() => setType("teacher")}
                />
              </div>
              <div>
                <label>consumer</label>
                <input
                  type="radio"
                  value="consumer"
                  checked={type === "consumer" ? true : false}
                  onChange={() => setType("consumer")}
                />
              </div>
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          <button onClick={() => setSignUp(false)}>Sign in</button>
        </div>
      ) : (
        <div>
          <h1>Please Log In</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn({ login: username, password });
            }}
          >
            <label>
              <p>Username</p>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          <button onClick={() => setSignUp(true)}>Sign up</button>
        </div>
      )}
    </div>
  );
}
