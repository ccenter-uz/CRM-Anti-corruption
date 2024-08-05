import dynamic from "next/dynamic";

export const RequestsAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Requests)
);
