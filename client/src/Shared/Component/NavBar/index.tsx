import * as React from "react";
import { useState, useRef, useCallback, lazy } from "react";

import { Redirect } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { NavPage, ComponentContainer, StyledTitle } from "./styles";
import useApi from "../../Hooks/useApi";

const url = "/api/logout";
const method = "post";
const IgnoreList = lazy(() => import("../../Component/IgnoreList"));

export default function Navbar<T>(Component: () => JSX.Element) {
  return function WithNavbar(props: React.Props<T>) {
    const [payload, setPayload] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isIgnoreListOpen, setIsIgnoreListOpen] = useState(false);
    const [isLoggedOut] = useApi(payload);
    const anchorEl = useRef<HTMLButtonElement>();

    const logout = useCallback(() => {
      setIsMenuOpen(false);
      setPayload({ url, method });
    }, [setPayload, setIsMenuOpen]);

    const openIgnoreDialog = useCallback(() => {
      setIsMenuOpen(false);
      setIsIgnoreListOpen(true);
    }, [setIsIgnoreListOpen, setIsMenuOpen]);

    if (isLoggedOut) {
      return <Redirect to="/login" />;
    }

    return (
      <NavPage>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <StyledTitle>{"DARK".split("").join(" ")}</StyledTitle>
            <IconButton onClick={setIsMenuOpen.bind(this, true)} ref={anchorEl}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl.current}
              keepMounted
              open={isMenuOpen}
              onClose={setIsMenuOpen.bind(this, false)}
            >
              <MenuItem onClick={openIgnoreDialog}>Ignore List</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
          {isIgnoreListOpen && (
            <IgnoreList
              open={isIgnoreListOpen}
              handleClose={setIsIgnoreListOpen.bind(this, false)}
            />
          )}
        </AppBar>
        <ComponentContainer>
          <Component {...props} />
        </ComponentContainer>
      </NavPage>
    );
  };
}
