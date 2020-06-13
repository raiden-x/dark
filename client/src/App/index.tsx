import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import GlobalStyles from "../Shared/styles";

const Login = lazy(() => import("../Login"));

export default function App() {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Router>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Suspense>
        <Link to="/login">go to login</Link>
      </Router>
    </>
  );
}
