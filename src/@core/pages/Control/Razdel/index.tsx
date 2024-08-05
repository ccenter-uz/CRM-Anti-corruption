import dynamic from "next/dynamic";

export const RazdelAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Razdel)
);

export const PodrazdelAsync = dynamic(() =>
  import("./model/Podrazdel/ui").then((mod) => mod.Podrazdel)
);
