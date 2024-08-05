import dynamic from "next/dynamic";

export const DraftsAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Drafts)
);
