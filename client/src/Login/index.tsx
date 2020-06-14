import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  LoginPage,
  StyledPaper,
  StyledTextField,
  StyledLabel,
  StyledPrimaryButton,
  ErrorDiv,
} from "./styles";
import { useLoginApi, credentials } from "../Shared/hooks/login";

export default function Login({
  setLoginStatus,
}: {
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const idInputEl = useRef<HTMLInputElement>();
  const passwordInputEl = useRef<HTMLInputElement>();
  const init: credentials = { username: "", password: "" };
  const [creds, setCreds] = useState(init);
  const [loggedIn, errorMessage] = useLoginApi(creds);
  useEffect(() => {
    setLoginStatus(loggedIn);
  }, [loggedIn, setLoginStatus]);
  const login = () => {
    setCreds({
      username: idInputEl.current.value,
      password: passwordInputEl.current.value,
    });
  };
  return (
    <LoginPage>
      <StyledPaper>
        <StyledLabel>
          ID
          <StyledTextField
            type="text"
            spellCheck={false}
            ref={idInputEl}
          ></StyledTextField>
        </StyledLabel>
        <StyledLabel>
          Password
          <StyledTextField
            type="password"
            ref={passwordInputEl}
          ></StyledTextField>
        </StyledLabel>
        <br />
        <StyledPrimaryButton onClick={login}>Login</StyledPrimaryButton>
        <br />
        {errorMessage && <ErrorDiv>{errorMessage}</ErrorDiv>}
      </StyledPaper>
    </LoginPage>
  );
}
