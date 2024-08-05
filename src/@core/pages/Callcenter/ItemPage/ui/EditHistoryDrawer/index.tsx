import { DrawerUI } from "@/@core/shared/ui/Drawer";
import { FC, useCallback } from "react";
import { useItemPage } from "../../model/Slicer";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { scssVariables } from "@/@core/application/utils/vars";
import { checkStatus } from "../../model/helper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditHistorydrawer: FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const { data } = useItemPage();

  // CHECKER-Status
  const checker = useCallback((t: string) => {
    return checkStatus(t);
  }, []);

  return (
    <DrawerUI
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      title="Ўзгаришлар тарихи"
    >
      <Divider my={"10px"} borderColor={"rgba(0,0,0,0.1)"} />

      {data[0]?.history.length > 0 &&
        data[0]?.history.map((item: any) => (
          <Flex
            align={"center"}
            justify={"space-between"}
            borderBottom={"1px solid rgba(0,0,0,0.1)"}
            pb={{ base: "10px", sm: "10px", md: "16px", xl: "16px" }}
            key={item?.id}
          >
            <Box>
              <Text fontSize={scssVariables.fonts.parag} fontWeight={500}>
                {item?.user_history.username}
              </Text>
              <Text
                color={scssVariables.textGreyColor}
                fontSize={scssVariables.fonts.span}
              >
                {item?.create_data &&
                  new Date(item?.create_data).toLocaleString()}
              </Text>
            </Box>
            <Text
              color={"green.400"}
              fontSize={scssVariables.fonts.span}
              fontWeight={300}
            >
              {checker(item?.action)}
            </Text>
          </Flex>
        ))}

      {data[0]?.history.length === 0 && (
        <Text
          fontSize={scssVariables.fonts.parag}
          textAlign={"center"}
          my={"20px"}
        >
          Ўзгаришлар йўқ
        </Text>
      )}
    </DrawerUI>
  );
};
