import * as React from "react";
import { forwardRef, useMemo } from "react";

import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";

import {
  StyledPaperHeader,
  StyledCloseIcon,
  StyledControlContainer,
} from "./styles";
import { Tab as TabProp } from "../../../Shared/Hooks/useChatState";

export default function TabHeader(tabProps: ChatTabHeaderProps) {
  const ModifiedTab = useMemo(() => {
    return forwardRef(function Header(props, ref) {
      return (
        <StyledPaperHeader ref={ref} {...props} component={undefined}>
          {tabProps.tab.userId}
          <StyledControlContainer>
            <div>
              <Badge
                color="secondary"
                badgeContent={tabProps.tab.unreadMessages}
              />
            </div>
            <IconButton onClick={tabProps.closeTab.bind(this, tabProps.tab)}>
              <StyledCloseIcon />
            </IconButton>
          </StyledControlContainer>
        </StyledPaperHeader>
      );
    });
  }, [tabProps.tab, tabProps.closeTab]);
  return (
    <Tab component={ModifiedTab} {...tabProps} value={tabProps.tab.userId} />
  );
}

interface ChatTabHeaderProps {
  tab: TabProp;
  closeTab: (u: TabProp, e: React.SyntheticEvent) => void;
  value: string;
}
