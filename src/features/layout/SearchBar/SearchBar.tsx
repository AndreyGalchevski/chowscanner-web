import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { colors } from "../../../utils/design";
import { useI18nState } from "../../i18n/I18nContext";

const Container = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  transitionProperty: "transform",
  transitionDuration: "0.3s",
  transitionTimingFunction: "ease-in-out",
  transform: isOpen ? "translateY(-150%)" : "translateY(0)",
  "@media (min-width: 577px)": {
    transform: "none",
  },
}));

const Input = styled.input({
  width: "14rem",
  height: "2.5rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  borderRadius: 10,
  border: "none",
  outline: "none",
  boxShadow: `2px 2px 20px ${colors.grey}`,
});

interface Props {
  isOpen: boolean;
}

const SearchBar: FunctionComponent<Props> = ({ isOpen }) => {
  const { translate } = useI18nState();

  return (
    <Container isOpen={isOpen}>
      <form>
        <Input
          type="search"
          name="search"
          placeholder={`${translate("search")}...`}
          autoComplete="off"
        />
      </form>
    </Container>
  );
};

export default SearchBar;
