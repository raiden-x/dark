import * as React from "react";
import { useState, useCallback } from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuOpen from "@material-ui/icons/MenuOpen";

import {
  StyledWatchList,
  StyledOpenButton,
  ButtonText,
  StyledDrawer,
} from "./styles";

export default function withNavDrawer<T>(Component: (p: any) => JSX.Element) {
  return function NavDrawer(props: T) {
    const mobileLayout = useMediaQuery("(max-width: 640px)");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = useCallback(
      (event) => {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
        setIsDrawerOpen(false);
      },
      [setIsDrawerOpen]
    );
    return (
      <>
        {!mobileLayout && (
          <StyledWatchList>
            <Component {...props} />
          </StyledWatchList>
        )}
        {mobileLayout && (
          <>
            <StyledOpenButton onClick={setIsDrawerOpen.bind(this, true)}>
              <MenuOpen />
              <ButtonText>Watch List</ButtonText>
            </StyledOpenButton>
            <StyledDrawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer}
            >
              <Component {...props} />
            </StyledDrawer>
          </>
        )}
      </>
    );
  };
}
