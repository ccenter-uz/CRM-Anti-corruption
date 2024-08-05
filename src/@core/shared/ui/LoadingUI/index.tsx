import { FC } from "react";
import { Box } from "@chakra-ui/react";

const LoaderUI: FC = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
      h={"100dvh"}
    >
      <span className="loader"></span>
    </Box>
  );
};

export default LoaderUI;
