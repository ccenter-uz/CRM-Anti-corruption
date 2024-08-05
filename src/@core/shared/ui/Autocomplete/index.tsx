"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { selectStyle } from "@/@core/features/FilterControlpage/model/helper";
import { FC, useEffect, useState } from "react";
import { Controller, Control } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

interface AutocompleteSelectProps {
  name: string;
  control: Control;
  options: { value: string | number | null; label: string }[];
  placeholder?: string;
  onChange?: (value: any) => void;
  required?: boolean;
}

const customStyles: StylesConfig<any, false> = {
  control: (provided) => ({
    ...provided,
    color: scssVariables.textGreyColor,
    border: "1px solid lightgrey",
    boxShadow: "none",
    minHeight: "35px",
    height: "35px",
    "@media (max-width: 768px)": {
      padding: "0",
      fontSize: "14px",
      minHeight: "25px",
      height: "auto",
    },
    "@media (max-width: 480px)": {
      padding: "0",
      fontSize: "12px",
      minHeight: "20px",
      height: "auto",
    },
    "&:hover": {
      border: `1px solid ${scssVariables.link}`,
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "md",
  }),
  menuList: (provided) => ({
    ...provided,
    border: "1px solid lightgrey",
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid lightgrey",
    backgroundColor: state.isSelected
      ? "#3182ce"
      : state.isFocused
      ? "#f0f4f8"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : `${scssVariables.textGreyColor}`,
    "&:active": {
      backgroundColor: "#3182ce",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    minHeight: "35px",
    height: "35px",
    "@media (max-width: 768px)": {
      padding: "0",
      fontSize: "14px",
      minHeight: "25px",
      height: "auto",
    },
    "@media (max-width: 480px)": {
      padding: "0",
      fontSize: "12px",
      minHeight: "20px",
      height: "auto",
    },
    color: `${scssVariables.textGreyColor}`,
  }),
};

const AutocompleteSelect: FC<AutocompleteSelectProps> = ({
  name,
  control,
  options,
  placeholder,
  onChange,
  required,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <Select
            {...field}
            styles={customStyles}
            options={options}
            value={
              options.find((option) => option.value === field.value) || null
            }
            onChange={(selectedOption) => {
              field.onChange(selectedOption?.value || null);
              if (onChange) {
                onChange(selectedOption);
              }
            }}
            placeholder={placeholder}
          />
        )}
      />
    )
  );
};

export default AutocompleteSelect;
