import { useReducer, useEffect } from "react";
import axios from "axios";

interface state {
  loggedIn: boolean;
  errorMessage: string | null;
}

export interface credentials {
  username: string;
  password: string;
}

type action = "success" | "failure";

const reducer = (state: state, action: action): state => {
  switch (action) {
    case "success":
      return {
        ...state,
        loggedIn: true,
        errorMessage: null,
      };
    case "failure":
      return {
        ...state,
        errorMessage: "Invalid username or password",
      };
    default:
      return state;
  }
};

export const useLoginApi = (
  credentials: credentials
): [boolean, string | null] => {
  const [state, dispatch] = useReducer(reducer, {
    loggedIn: false,
    errorMessage: null,
  });
  const loginFunction = async (credentials: credentials) => {
    try {
      await axios.post("/api/login", credentials);
      dispatch("success");
    } catch {
      dispatch("failure");
    }
  };
  useEffect(() => {
    if (credentials.username && credentials.password) {
      loginFunction(credentials);
    }
  }, [credentials]);
  return [state.loggedIn, state.errorMessage];
};
