import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import axios from "axios";
import "./Login.css";

async function signIn(credentials) {
  const response = await axios.post("http://localhost:7890/auth/find", credentials);
  if (response.data) {
    localStorage.setItem("user_platform", JSON.stringify(response.data));
    window.location.href = "/dashboard";
  }
  return response.data;
}

async function signUp(credentials) {
  const response = await axios.post("http://localhost:7890/auth/create", credentials);
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
          <h2>Please Sign Up</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUp({ login: username, password, type });
            }}
          >
            <Input
              color="success"
              className="inp"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              color="success"
              className="inp"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel id="role-lbl">Role: </FormLabel>
            <RadioGroup row aria-labelledby="role-lbl" name="row-radio-buttons-group">
              <FormControlLabel
                value="teacher"
                checked={type === "teacher" ? true : false}
                onChange={() => setType("teacher")}
                control={<Radio color="success" />}
                label="Teacher"
              />
              <FormControlLabel
                value="consumer"
                checked={type === "consumer" ? true : false}
                onChange={() => setType("consumer")}
                control={<Radio color="success" />}
                label="Consumer"
              />
            </RadioGroup>
            <div className="buttons">
              <Button color="success" variant="text" onClick={() => setSignUp(false)}>
                Sign in
              </Button>
              <Button color="success" type="submit" variant="contained">
                {" "}
                Submit{" "}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>Please Log In</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn({ login: username, password });
            }}
          >
            <Input
              color="success"
              className="inp"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              color="success"
              className="inp"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel style={{ visibility: "hidden" }} id="role-lbl">
              Role1:{" "}
            </FormLabel>
            <RadioGroup style={{ visibility: "hidden" }} row aria-labelledby="role-lbl" name="row-radio-buttons-group">
              <FormControlLabel
                value="teacher"
                checked={type === "teacher" ? true : false}
                onChange={() => setType("teacher")}
                control={<Radio color="success" />}
                label="Teacher"
              />
              <FormControlLabel
                value="consumer"
                checked={type === "consumer" ? true : false}
                onChange={() => setType("consumer")}
                control={<Radio color="success" />}
                label="Consumer"
              />
            </RadioGroup>
            <div className="buttons">
              <Button color="success" variant="text" onClick={() => setSignUp(true)}>
                Sign up
              </Button>
              <Button color="success" type="submit" variant="contained">
                {" "}
                Submit{" "}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
