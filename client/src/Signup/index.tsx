import * as React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import Button from "@material-ui/core/Button";
import useApi from "../Shared/hooks/api";
import { TextInput } from "../Shared/StyledMaterialui";
import { StyledPaper, Page, ErrorDiv } from "../Shared/StyledComponents";
import { Method } from "axios";
import Password from "../Shared/Component/Password";
import { Redirect } from "react-router-dom";
import { setAuthHeader } from "../Shared/utils/Auth";

const url = "/register";
const method: Method = "post";
const checkId = (userId: string) => !!userId;
const checkPassword = (password: string) => password.length >= 8;
const checkRePassword = (password: string, repassword: string) =>
  password === repassword;

export default function Signup() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRePasswordValid, setIsRePasswordValid] = useState(true);
  const [payload, setPayload] = useState(null);
  const [data, err] = useApi(payload);
  const register = () => {
    const validId = checkId(userId);
    const validPassword = checkPassword(password);
    const validRepassword = checkRePassword(password, repassword);
    setIsIdValid(validId);
    setIsPasswordValid(validPassword);
    setIsRePasswordValid(validRepassword);
    if (validId && validPassword && validRepassword) {
      setPayload({
        url,
        method,
        data: { username: userId, password: password },
      });
    }
  };
  useEffect(() => {
    if (!!data) {
      setAuthHeader();
    }
  }, [data]);
  const userIdChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const passwordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const repasswordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setRepassword(e.target.value);
  if (!!data) {
    return <Redirect to="/chat" />;
  }
  return (
    <Page>
      <StyledPaper>
        <TextInput
          variant="outlined"
          label="User ID"
          value={userId}
          onChange={userIdChanged}
          color="secondary"
          helperText={isIdValid ? "" : "Required"}
          error={!isIdValid}
        ></TextInput>
        <Password
          variant="outlined"
          label="Password"
          value={password}
          onChange={passwordChanged}
          helperText={
            isPasswordValid ? "" : "Password should be atleast 8 char in length"
          }
          error={!isPasswordValid}
          color="secondary"
        ></Password>
        <Password
          variant="outlined"
          label="Confirm Password"
          value={repassword}
          onChange={repasswordChanged}
          color="secondary"
          error={!isRePasswordValid}
          helperText={
            isRePasswordValid
              ? ""
              : "Those Passwords don't match. Please try again"
          }
        ></Password>
        <Button onClick={register} variant="contained" color="primary">
          <b>Register</b>
        </Button>
      </StyledPaper>
      {err && <ErrorDiv>unexpected error</ErrorDiv>}
    </Page>
  );
}
