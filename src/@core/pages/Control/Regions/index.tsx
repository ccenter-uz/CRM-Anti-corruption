import dynamic from "next/dynamic";

export const RegionsAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Regions)
);

export const AreasAsync = dynamic(() =>
  import("./model/Areas/ui").then((mod) => mod.Areas)
);
