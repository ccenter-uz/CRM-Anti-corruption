import dynamic from "next/dynamic";

export const OperatorsAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Operators)
);
