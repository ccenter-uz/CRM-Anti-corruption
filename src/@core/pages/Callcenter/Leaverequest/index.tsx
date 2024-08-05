import dynamic from "next/dynamic";

export const LeaverequestAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Leaverequest)
);
