import { scssVariables } from "@/@core/application/utils/vars";

// STYLES
export const labelStyle = {
  color: scssVariables.textGreyColor,
  fontSize: scssVariables.fonts.parag,
  fontWeight: 400,
  marginTop: { base: "8px", sm: "8px", md: "16px", xl: "16px" },
};

export const inputStyle = {
  color: scssVariables.textGreyColor,
  fontSize: scssVariables.fonts.parag,
  fontWeight: 400,
  h: { base: "30px", sm: "30px", md: "40px", xl: "40px" },
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
  h: { base: "30px", sm: "30px", md: "40px", xl: "40px" },
  _focus: { boxShadow: "none", outline: scssVariables.primary },
  borderColor: "lightgrey",
};

export const buttonStyle = {
  w: {
    base: "100%",
    sm: "100%",
    md: "fit-content",
    xl: "fit-content",
  },
  h: { base: "30px", sm: "30px", md: "40px", xl: "40px" },
  fontSize: scssVariables.fonts.parag,
  fontWeight: 400,
  _hover: {
    background: scssVariables.primary,
    opacity: 0.8,
    transition: "opacity 0.2s linear",
  },
  bg: scssVariables.primary,
  color: "whitesmoke",
};

// LISTS
export const regionList = [
  {
    id: 1,
    label: "Toshkent shahar",
  },
  {
    id: 2,
    label: "Toshkent viloyati",
  },
  {
    id: 3,
    label: "Namangan viloyati",
  },
  {
    id: 4,
    label: "Andijon viloyati",
  },
  {
    id: 5,
    label: "Sirdaryo viloyati",
  },
  {
    id: 6,
    label: "Qoraqalpogiston respublikasi",
  },
  {
    id: 7,
    label: "Farg‘ona viloyati",
  },
  {
    id: 8,
    label: "Xorazm viloyati",
  },
  {
    id: 9,
    label: "Jizzax viloyati",
  },
  {
    id: 10,
    label: "Surxondaryo viloyati",
  },
  {
    id: 11,
    label: "Navoiy viloyati",
  },
  {
    id: 12,
    label: "Buxoro viloyati",
  },
  {
    id: 13,
    label: "Samarqand viloyati",
  },
  {
    id: 14,
    label: "Qashqadaryo viloyati",
  },
];
export const organizationTypeList = [
  {
    id: 1,
    label: "Юридический",
  },
  {
    id: 2,
    label: "Физический",
  },
];
export const applicationTypeList = [
  {
    id: 1,
    label: "Ariza",
  },
  {
    id: 2,
    label: "Taklif",
  },
  {
    id: 3,
    label: "Shikoyat",
  },
];
export const resend_applicationList = [
  {
    id: 1,
    label: "Yangi",
  },
  {
    id: 2,
    label: "Takroriy",
  },
];
export const responseList = [
  {
    id:0,
    label:"Тегишлилиги бўйича жўнатилган"
  },
  {
    id: 1,
    label: "Тушунтирилган",
  },
  {
    id: 2,
    label: "Қаноатлантирилган",
  },
  {
    id: 3,
    label: "Кўрмасдан қолдирилган",
  },
  {
    id: 4,
    label: "Аноним",
  },
];
export const statusList = [
  {
    id: "Кўриб чиқиш жараёнида",
    label: "Кўриб чиқиш жараёнида",
  },
  {
    id: "Кўриб чиқилган",
    label: "Кўриб чиқилган",
  },
]
