import dynamic from "next/dynamic";

export const OrganizationsAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Organizations)
);
