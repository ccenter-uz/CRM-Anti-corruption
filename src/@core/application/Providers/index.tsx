import { ReactNode } from "react";
import { ChakraProviders } from "./chakraProvider";
import { NProgressProvider } from "./nProgress";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NProgressProvider>
      <ChakraProviders>{children}</ChakraProviders>
    </NProgressProvider>
  );
};
