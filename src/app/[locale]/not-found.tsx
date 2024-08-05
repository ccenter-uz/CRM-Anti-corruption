import React from "react";
import { useTranslations } from "next-intl";
import { Box, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  const t = useTranslations();

  return (
    <Box
      className="wrapper"
      aria-current={"page"}
      minH={"100dvh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      aria-label={"error-page"}
    >
      <Text
        fontWeight={600}
        fontSize={{ base: "16px", sm: "16px", md: "22px", xl: "24px" }}
      >
        {t("NOT_FOUND")}
      </Text>
    </Box>
  );
};

export default NotFoundPage;
