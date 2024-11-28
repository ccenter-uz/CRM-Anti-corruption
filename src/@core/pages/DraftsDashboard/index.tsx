import dynamic from "next/dynamic";

export const DraftsDashboardAsync = dynamic(() =>
  import("./ui").then((mod) => mod.DraftsDashboard)
);
