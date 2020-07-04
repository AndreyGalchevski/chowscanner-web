import React, { FunctionComponent, ChangeEvent } from "react";

import { useI18nState, useI18nActions } from "../I18nContext";
import { LanguageCode } from "../types";
import Select from "../../../components/Select/Select";

const languageSelectOptions = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
  { value: "he", label: "HE" },
  { value: "ru", label: "RU" },
];

const LanguageSelect: FunctionComponent = () => {
  const { languageCode } = useI18nState();
  const { setLanguage } = useI18nActions();

  const onLanguageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageCode);
  };

  return (
    <Select
      value={languageCode}
      onChange={onLanguageSelect}
      options={languageSelectOptions}
    />
  );
};

export default LanguageSelect;
