import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { authHeaders } from "../../Utils/Auth";

export default function ProtectedRoutes(props: any) {
  const Component = props.component;
  return (
    <Route
      render={() =>
        authHeaders.jwt ? <Component /> : <Redirect to="/login" />
      }
    />
  );
}
