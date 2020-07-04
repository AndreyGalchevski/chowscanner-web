import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { colors } from "../../../utils/design";

const Container = styled.div({
  display: "flex",
  flex: 1,
});

export const StyledBurger = styled.button<{ isOpen: boolean }>(
  ({ isOpen }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "3rem",
    height: "3rem",
    background: colors.white,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    padding: "1rem",
    transitionProperty: "box-shadow",
    transitionDuration: "0.3s",
    transitionTimingFunction: "linear",
    boxShadow: isOpen ? "none" : `2px 2px 20px ${colors.grey}`,
    "&:focus": {
      outline: "none",
    },
  })
);

const Bar = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  width: "1rem",
  height: "0.125rem",
  background: colors.black,
  borderRadius: 10,
  transitionProperty: "all",
  transitionDuration: "0.3s",
  transitionTimingFunction: "linear",
  transformOrigin: 1,
  ":first-child": {
    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
  },
  ":nth-child(2)": {
    opacity: isOpen ? "0" : "1",
    transform: isOpen ? "translateX(20px)" : "translateX(0)",
  },
  ":nth-child(3)": {
    transform: isOpen ? "rotate(-45deg)" : "rotate(0)",
  },
}));

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const Burger: FunctionComponent<Props> = ({ isOpen, onClick }) => {
  return (
    <Container>
      <StyledBurger isOpen={isOpen} onClick={onClick}>
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
      </StyledBurger>
    </Container>
  );
};

export default Burger;
