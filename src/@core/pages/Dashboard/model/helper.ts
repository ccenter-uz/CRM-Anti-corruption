import { scssVariables } from "@/@core/application/utils/vars";

// STYLES
export const labelStyle = {
  color: scssVariables.textGreyColor,
  fontSize: scssVariables.fonts.span,
  fontWeight: 400,
  marginTop: { base: "8px", sm: "8px", md: "16px", xl: "16px" },
};

export const inputStyle = {
  color: scssVariables.textGreyColor,
  fontSize: scssVariables.fonts.parag,
  fontWeight: 400,
  h: { base: "30px", sm: "30px", md: "35px", xl: "35px" },
  _focus: { boxShadow: "none", outline: scssVariables.primary },
  p: {
    base: "5px",
    sm: "5px",
    md: "16px",
    xl: "16px",
  },
  borderColor: "lightgrey",
};

export const selectStyle = {
  color: scssVariables.textGreyColor,
  fontSize: scssVariables.fonts.parag,
  fontWeight: 400,
  h: { base: "30px", sm: "30px", md: "35px", xl: "35px" },
  _focus: { boxShadow: "none", outline: scssVariables.primary },
  borderColor: "lightgrey",
};

export const buttonStyle = {
  w: {
    base: "100%",
    sm: "100%",
    md: "248px",
    xl: "248px",
  },
  h: { base: "30px", sm: "30px", md: "35px", xl: "35px" },
  fontSize: scssVariables.fonts.span,
  fontWeight: 400,
  _hover: {
    background: scssVariables.primary,
    opacity: 0.8,
    transition: "opacity 0.2s linear",
  },
  bg: scssVariables.primary,
  color: "whitesmoke",
};

// VARS
export const Dashboardcolumns = [
  {
    title: "№",
    dataIndex: "index",
    key: "index",
    width: 50,
    align: "center",
  },
  {
    title: "Вилоят",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Йўналиш",
    dataIndex: "razdel",
    key: "razdel",
  },
  {
    title: "Тасниф",
    dataIndex: "podrazdel",
    key: "podrazdel",
  },
  {
    title: "Келиб тушган мурожаатлар",
    dataIndex: "income",
    key: "income",
    render: (t: string) => (t ? t : 0) + " та",
  },
];
