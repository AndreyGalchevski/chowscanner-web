import React, { useState, FunctionComponent } from "react";
import styled from "@emotion/styled";

import Burger from "../Burger";
import Menu from "../Menu";
import SearchBar from "../SearchBar";

const Navbar = styled.nav({
  position: "absolute",
  top: "1rem",
  left: "1rem",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  zIndex: 1002,
});

const Filler = styled.div({
  flex: 1,
});

interface Props {
  showSearchBar: boolean;
}

const Navigation: FunctionComponent<Props> = ({ showSearchBar = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar>
        <Burger isOpen={isMenuOpen} onClick={handleClick} />
        {showSearchBar && <SearchBar isOpen={isMenuOpen} />}
        <Filler />
      </Navbar>
      <Menu isOpen={isMenuOpen} onMenuItemClick={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navigation;
