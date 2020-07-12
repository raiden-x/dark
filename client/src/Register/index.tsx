import * as React from "react";
import {
  useState,
  ChangeEvent,
  useEffect,
  SyntheticEvent,
  useCallback,
} from "react";
import { Redirect } from "react-router-dom";

import { Method } from "axios";
import Button from "@material-ui/core/Button";

import useApi from "../Shared/Hooks/useApi";
import TextInput from "../Shared/Component/FormTextField";
import Paper from "../Shared/Component/Paper";
import ErrorDiv from "../Shared/Component/ErrorDiv";
import BasePage from "../Shared/Component/BasePage";
import Password from "../Shared/Component/Password";
import Form from "../Shared/Component/Form";
import { setAuthHeader } from "../Shared/Utils/Auth";
import { useShowSnackbar } from "../Shared/Hooks/useSnackbar";

const url = "/api/register";
const method: Method = "post";
const passwordRegex = new RegExp(
  "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"
);
const checkId = (userId: string) => !!userId;
const checkPassword = (password: string) => passwordRegex.test(password);
const checkRePassword = (password: string, repassword: string) =>
  password === repassword;

export default function Signup() {
  const showSnackbar = useShowSnackbar();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRePasswordValid, setIsRePasswordValid] = useState(true);
  const [payload, setPayload] = useState(null);
  const [hasRegistered, err] = useApi(payload);
  const register = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
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
    },
    [password, repassword, userId]
  );
  useEffect(() => {
    if (hasRegistered) {
      setAuthHeader();
      showSnackbar("Registered");
    }
  }, [hasRegistered, showSnackbar]);
  const userIdChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const passwordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const repasswordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setRepassword(e.target.value);
  if (hasRegistered) {
    return <Redirect to="/login" />;
  }
  return (
    <BasePage>
      <Paper>
        <Form>
          <TextInput
            variant="outlined"
            label="User ID"
            value={userId}
            onChange={userIdChanged}
            color="secondary"
            helperText={isIdValid ? "" : "Required"}
            spellCheck={false}
            error={!isIdValid}
          ></TextInput>
          <Password
            variant="outlined"
            label="Password"
            value={password}
            onChange={passwordChanged}
            helperText={
              isPasswordValid
                ? ""
                : "Password should be atleast 8 char in length and have 1 Uppercase 1 Lowercase 1 number and 1 special character"
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
          <Button onClick={register} type="submit" color="primary">
            <b>Register</b>
          </Button>
        </Form>
      </Paper>
      <br />
      {err && <ErrorDiv>{err}</ErrorDiv>}
    </BasePage>
  );
}
