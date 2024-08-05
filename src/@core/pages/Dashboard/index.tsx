import dynamic from "next/dynamic";

export const DashboardAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Dashboard)
);
