import * as React from "react";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "../Shared/styles";
import ProtectedRoutes from "../Shared/Component/ProtectedRoute";
import Chat from "../Chat";

const Login = lazy(() => import("../Login"));

export default function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Router>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route
              path="/login"
              render={() => <Login setLoginStatus={setIsloggedIn}></Login>}
            ></Route>
            <ProtectedRoutes
              isLoggedIn={isLoggedIn}
              path="/chat"
              component={Chat}
            ></ProtectedRoutes>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}
