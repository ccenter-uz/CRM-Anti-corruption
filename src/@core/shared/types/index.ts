import { Dispatch, ReactNode, SetStateAction } from "react";

// TABLE
export type IcolumnTable = {
  title: string;
  dataIndex?: string;
  key: string;
  align?: "left" | "center" | "right" | any;
  width?: string;
  height?: string;
  render?: any;
};
export type IrowTable = {
  [key: string]: React.ReactNode;
};
export type ItableType = {
  columns: IcolumnTable[];
  dataSource: IrowTable[];
  ColBg?: string;
  RowBg?: string;
  border?: boolean;
};

interface Column {
  title: string;
  key: string;
}

export interface Row {
  [key: string]: string;
}

export interface TableData {
  id: number;
  header: Column[];
  rows: Row[];
}

// RICH EDITOR
export type IRichEditor = {
  isOpen: boolean;
  onClose: SetStateAction<any>;
  defaultValue: { id: string | number; text: string }[] | null;
  value: { id: number; text: string }[];
  setValue: Dispatch<SetStateAction<any>>;
};

// Autocomplete
export type IOption = {
  value: string;
  label: string;
};

export type ISelectAutocomplelte = {
  options: IOption[];
  onSelect: (selectedOption: IOption) => void;
};

// PAGINATION
export type IPagination = {
  total: number;
  pageSize: number;
  current: number;
  onChange: (arg0: number) => void;
  onPageSizeChange: (arg0: number) => void;
};

export type IPaginationItems = {
  total: number;
  pageSize: number;
  current: number;
};

export type IFilterTable = {
  open: boolean;
  onChange: (values: any) => void;
  children?: ReactNode;
};

export type IdataInfo = {
  id: string;
  mention: string;
  warning: string;
  title: string;
  type: "text" | "table";
  content?: { id: string | number; text: string }[];
  table_arr: {
    table: TableData[];
  };
  update_date: string;
};

export type IcreateAccordionType = {
  open: boolean;
  close: () => void;
  setGetAgain: Dispatch<SetStateAction<boolean>>;
};

export type MoreFilterType = {
  city: string;
  district: string;
  house: string;
  kv: string;
  kvartal: string;
  mainorg: string;
  nameorg: string;
  orientir: string;
  podrazdel: string;
  "podrazdel-tu": string;
  poselok: string;
  razdel: string;
  "razdel-tu": string;
  region: string;
  view: string;
};
