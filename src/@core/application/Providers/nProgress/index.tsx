"use client";
import { Next13ProgressBar } from "next13-progressbar";
import { ReactNode } from "react";
import { scssVariables } from "../../utils/vars";

export const NProgressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="3px"
        color={scssVariables.primary}
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
};
