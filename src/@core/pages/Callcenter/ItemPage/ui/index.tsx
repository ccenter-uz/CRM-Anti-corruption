"use client";
import { FC, useEffect } from "react";
import { useItemPage } from "../model/Slicer";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import BreadCrumb from "@/@core/shared/ui/Breadcrumb";
import { Download, PenTool } from "react-feather";
import { scssVariables } from "@/@core/application/utils/vars";
import { EditHistorydrawer } from "./EditHistoryDrawer";
import { useDisclosure } from "@/@core/shared/hook/useDisclosure";
import { PDFView } from "./PDFView";

export const Itempage: FC = () => {
  const query = useParams();
  const router = useRouter();
  const { data, getData } = useItemPage();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isPdfOpen,
    onClose: pdfClose,
    onOpen: pdfOpen,
  } = useDisclosure();
  const breadcrumb = [
    {
      id: 1,
      title: (
        <Button
          variant={"unstyled"}
          fontWeight={400}
          fontSize={{ base: "10px", sm: "10px", md: "14px", xl: "14px" }}
          onClick={() => router.back()}
        >
          {"<- Ортга"}
        </Button>
      ),
    },
    {
      id: 2,
      title: "Мурожаат",
    },
    {
      id: 3,
      title: `№-${data[0]?.incoming_number}`,
    },
  ];

  useEffect(() => {
    getData(query?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  return (
    <Box
      p={{ base: "5px 10px", sm: "5px 10px", md: "8px 16px", xl: "8px 16px" }}
    >
      <BreadCrumb item={breadcrumb} />
      <Flex
        align={"center"}
        gap={"10px"}
        justify={"flex-end"}
        flexWrap={"wrap"}
      >
        <Button
          h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
          leftIcon={<Download width={"16px"} height={"16px"} />}
          fontSize={scssVariables.fonts.parag}
          onClick={pdfOpen}
          fontWeight={400}
          variant={"outline"}
          color={"orange.400"}
          borderColor={"orange.400"}
          _hover={{ bg: "orange.400", color: "white" }}
        >
          PDF юклаш
        </Button>
        <Button
          h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
          leftIcon={<PenTool width={"16px"} height={"16px"} />}
          fontSize={scssVariables.fonts.parag}
          onClick={onOpen}
          fontWeight={400}
          variant={"outline"}
          color={"green.400"}
          borderColor={"green.400"}
          _hover={{ bg: "green.400", color: "white" }}
        >
          Ўзгартириш тарихи
        </Button>
      </Flex>

      <PaperContent>
        <Flex
          align={"center"}
          gap={"10px"}
          justify={"space-between"}
          wrap={"wrap"}
        >
          <Text color={scssVariables.textGreyColor} fontWeight={500}>
            Хужжат: № {data[0]?.incoming_number}
          </Text>
        </Flex>
        <Divider my={"16px"} borderColor={"lightgrey"} />
        {data[0]?.IsDraf === "true" && (
          <Text
            fontWeight={700}
            p={"8px"}
            w={"fit-content"}
            color={"grey"}
            bg={"lightgrey"}
            borderRadius={"4px"}
            textTransform={"uppercase"}
            fontSize={{ base: "14px", sm: "14px", md: "18px", xl: "18px" }}
          >
            Қоралама
          </Text>
        )}
        <Box
          mt={{ base: "16px", sm: "16px", md: "20px", xl: "24px" }}
          mb={{ base: "16px", sm: "16px", md: "3em", xl: "3em" }}
          mx={{ base: "16px", sm: "16px", md: "3em", xl: "3em" }}
          gap={"16px"}
          display={"flex"}
          flexDirection={"column"}
        >
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            gap={"16px"}
            alignItems={"flex-start"}
          >
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Хужжат кирувчи ракам ва санаси
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.incoming_number}-
                {data[0]?.income_date &&
                  Intl.DateTimeFormat("ru", {
                    dateStyle: "long",
                    timeStyle: "short",
                  }).format(new Date(data[0]?.income_date))}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Вилоят
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.districts?.region?.title || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Туман
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.districts?.title || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Юридик / Жисмоний Шахс
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.organization_type || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Мурожатчи
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.applicant || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Телефон Рақами
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.phone || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Мурожаат тури
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.application_type || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Йўналиш
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.sub_category_call_center?.title || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Тасниф
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.sub_category_call_center?.category_org?.title ||
                  "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Мурожаат шакли
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.resend_application || "Маълумот йўқ"}
              </Text>
            </Box>
          </SimpleGrid>
          <Box
            p={"16px"}
            boxShadow={scssVariables.boxShadowPartnerBox}
            border={"1px solid whitesmoke"}
            borderRadius={"8px"}
          >
            <Text
              color={scssVariables.textGreyColor}
              fontWeight={500}
              fontSize={scssVariables.fonts.parag}
            >
              Мурожаатнинг Қисқача Мазмуни
            </Text>
            <Divider my={"16px"} borderColor={"lightgrey"} />
            <Text
              color={scssVariables.textGreyColor}
              fontWeight={400}
              fontSize={scssVariables.fonts.span}
            >
              {data[0]?.comment || "Маълумот йўқ"}
            </Text>
          </Box>
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, xl: 2 }}
            gap={"16px"}
            alignItems={"flex-start"}
            mt={"24px"}
          >
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Ижрочи
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.performer || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Ижро Қилинган Сана
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.perform_date || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Тегишли Идораларга Юборилган
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.seded_to_Organization?.title || "Маълумот йўқ"}
              </Text>
            </Box>
            <Box>
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={500}
                fontSize={scssVariables.fonts.parag}
              >
                Мурожаатни Жавоби
              </Text>
              <Text
                color={scssVariables.textBlackColor}
                fontWeight={400}
                fontSize={scssVariables.fonts.span}
              >
                {data[0]?.response === "null" && data[0]?.response
                  ? "Маълумот йўқ"
                  : data[0]?.response}
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </PaperContent>

      {/* Drawer */}
      <EditHistorydrawer isOpen={isOpen} onClose={onClose} />
      {/* PDFViewer */}

      <PDFView isOpen={isPdfOpen} onClose={pdfClose} data={data} />
    </Box>
  );
};
