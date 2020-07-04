import React, { FunctionComponent } from "react";

import styled from "@emotion/styled";

import { colors } from "../../../utils/design";
import LanguageSelect from "../../i18n/LanguageSelect";
import { NavLink } from "react-router-dom";

export const StyledMenu = styled.aside<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: colors.white,
  height: "100vh",
  textAlign: "left",
  padding: "2rem",
  transitionProperty: "transform",
  transitionDuration: "0.3s",
  transitionTimingFunction: "ease-in-out",
  transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  zIndex: 1001,
  "@media (max-width: 576px)": {
    width: "100%",
    padding: 0,
  },
}));

const MenuItem = styled(NavLink)({
  fontSize: "2rem",
  textTransform: "uppercase",
  padding: "2rem 0",
  fontWeight: "bold",
  letterSpacing: "0.5rem",
  color: colors.black,
  textDecoration: "none",
  transitionProperty: "color",
  transitionDuration: "0.3s",
  transitionTimingFunction: "linear",
  "@media (max-width: 576px)": {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  "&:hover": {
    color: colors.purple,
  },
});

const LanguageSelectContainer = styled.div({
  textAlign: "center",
  fontSize: 16,
  padding: "2rem 0",
});

interface Props {
  isOpen: boolean;
  onMenuItemClick: () => void;
}

const Menu: FunctionComponent<Props> = ({ isOpen, onMenuItemClick }) => (
  <StyledMenu isOpen={isOpen}>
    <MenuItem to="/" onClick={onMenuItemClick}>
      Home
    </MenuItem>
    <MenuItem to="/about" onClick={onMenuItemClick}>
      About us
    </MenuItem>
    <MenuItem to="/contact" onClick={onMenuItemClick}>
      Contact
    </MenuItem>
    <LanguageSelectContainer>
      <LanguageSelect />
    </LanguageSelectContainer>
  </StyledMenu>
);

export default Menu;
