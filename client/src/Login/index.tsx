import * as React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Method } from "axios";
import Button from "@material-ui/core/Button";
import Paper from "../Shared/Component/Paper";
import BasePage from "../Shared/Component/BasePage";
import ErrorDiv from "../Shared/Component/ErrorDiv";
import TextInput from "../Shared/Component/FormTextField";
import Password from "../Shared/Component/Password";
import { setAuthHeader } from "../Shared/Utils/Auth";
import useApi from "../Shared/Hooks/useApi";
import { LESpan, StyledLink } from "./styles";

const url = "/api/authenticate";
const method: Method = "post";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [payload, setPayload] = useState(null);
  const [hasLoggedIn, err] = useApi(payload);
  const idChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passwordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    hasLoggedIn && setAuthHeader();
  }, [hasLoggedIn]);
  function login() {
    setPayload({
      url,
      method,
      data: {
        username: id,
        password: password,
      },
    });
  }
  if (hasLoggedIn) {
    return <Redirect to="/chat" />;
  }
  return (
    <BasePage>
      <Paper>
        <TextInput
          color="secondary"
          label="ID"
          variant="outlined"
          value={id}
          onChange={idChanged}
        ></TextInput>
        <Password
          label="Password"
          color="secondary"
          onChange={passwordChanged}
          value={password}
        ></Password>
        <Button variant="contained" color="primary" onClick={login}>
          <b>Login</b>
        </Button>
      </Paper>
      <div style={{ marginTop: "10px" }}>
        <LESpan>New User? </LESpan>
        <StyledLink to="/register">Sign Up</StyledLink>
      </div>
      <br />
      {err && <ErrorDiv>{err}</ErrorDiv>}
    </BasePage>
  );
}
