import * as React from "react";
import { lazy, Suspense, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import GlobalStyles from "../Shared/styles";
import { useInitSnackbar } from "../Shared/Hooks/useSnackbar";
import ProtectedRoutes from "../Shared/Component/ProtectedRoute";
import Loader from "../Shared/Component/Loader";
import { MessageProvider } from "../Shared/Context/Message";
import { setAuthHeader } from "../Shared/Utils/Auth";
import { darkTheme } from "./theme";

const Login = lazy(() => import("../Login"));
const Register = lazy(() => import("../Register"));
const Chat = lazy(() => import("../Chat"));

export default function App() {
  const { snackbarState, setSnackbarState } = useInitSnackbar();
  useMemo(setAuthHeader, []);
  return (
    <MessageProvider value={setSnackbarState}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles></GlobalStyles>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register} />
              <ProtectedRoutes component={Chat}></ProtectedRoutes>
            </Switch>
          </Suspense>
        </Router>
        <Snackbar {...snackbarState} />
      </ThemeProvider>
    </MessageProvider>
  );
}
