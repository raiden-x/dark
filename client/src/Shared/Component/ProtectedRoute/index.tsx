import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoutes(props: any) {
  if (props.isLoggedIn) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}
