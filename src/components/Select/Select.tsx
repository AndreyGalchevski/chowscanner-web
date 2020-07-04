import React, { FunctionComponent, ChangeEvent } from "react";
import styled from "@emotion/styled";

const StyledSelect = styled.select({
  width: "5rem",
  height: "2.5rem",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  borderRadius: 10,
  outline: "none",
  cursor: "pointer",
});

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const Select: FunctionComponent<Props> = ({ value, onChange, options }) => (
  <StyledSelect onChange={onChange} value={value}>
    {options.map((it) => (
      <option key={it.value} value={it.value}>
        {it.label}
      </option>
    ))}
  </StyledSelect>
);

export default Select;
