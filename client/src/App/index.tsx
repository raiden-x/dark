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
import { initAudioStream } from "../Shared/Utils/Audio";
import { initNotification } from "../Shared/Utils/Notifications";
import { darkTheme } from "./theme";

const Login = lazy(() => import("../Login"));
const Register = lazy(() => import("../Register"));
const Chat = lazy(() => import("../Chat"));

export default function App() {
  const { snackbarState, setSnackbarState } = useInitSnackbar();
  useMemo(setAuthHeader, []);
  useMemo(initAudioStream, []);
  useMemo(initNotification, []);
  return (
    <MessageProvider value={setSnackbarState}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles />
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectedRoutes component={Chat} />
            </Switch>
          </Suspense>
        </Router>
        <Snackbar {...snackbarState} />
      </ThemeProvider>
    </MessageProvider>
  );
}
