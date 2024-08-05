import dynamic from "next/dynamic";

export const SigninAsync = dynamic(() =>
  import("./Signin/ui").then((mod) => mod.Signin)
);
