import * as React from "react";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Logout from "@material-ui/icons/ExitToAppOutlined";

import { NavPage, ComponentContainer, StyledTitle } from "./styles";
import useApi from "../../Hooks/useApi";
import { Redirect } from "react-router";

const url = "/api/logout";
const method = "post";

export default function Navbar<T>(Component: () => JSX.Element) {
  return function WithNavbar(props: React.Props<T>) {
    const [payload, setPayload] = useState(null);
    const [isLoggedOut] = useApi(payload);

    const logout = () => {
      setPayload({ url, method });
    };

    if (isLoggedOut) {
      return <Redirect to="/login" />;
    }

    return (
      <NavPage>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <StyledTitle>Dark</StyledTitle>
            <IconButton onClick={logout}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ComponentContainer>
          <Component {...props} />
        </ComponentContainer>
      </NavPage>
    );
  };
}
