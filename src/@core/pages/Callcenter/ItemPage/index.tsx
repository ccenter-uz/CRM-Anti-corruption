import dynamic from "next/dynamic";

export const ItemPageAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Itempage)
);
