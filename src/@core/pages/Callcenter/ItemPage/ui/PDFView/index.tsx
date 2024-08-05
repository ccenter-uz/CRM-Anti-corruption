import { scssVariables } from "@/@core/application/utils/vars";
import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FC, useRef } from "react";
import { Download } from "react-feather";

type Props = {
  data: any;
  isOpen: boolean;
  onClose: () => void;
};

const fontSizes = {
  title: "18px",
  parag: "16px",
  span: "14px",
};

export const PDFView: FC<Props> = (props) => {
  const { data, isOpen, onClose } = props;
  const pdfRef = useRef<any>(null);
  const iframeRef = useRef<any>(null);

  //   PRINT
  const handlePrint = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 1.5, // Adjust the scale for balance between quality and performance
      useCORS: true, // Allow cross-origin images
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Adjust the height to fit A4 format
    const pageHeight = pdf.internal.pageSize.getHeight();
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = iframeRef.current;

    iframe.src = pdfUrl;
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
    pdf.save(`№-${data[0]?.incoming_number}.pdf`);
  };

  return (
    <Modal isOpen={isOpen} size={"6xl"} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <iframe ref={iframeRef} style={{ display: "none" }}></iframe>
        <ModalBody p={0} ref={pdfRef}>
          <Flex
            align={"center"}
            gap={"10px"}
            justify={"space-between"}
            wrap={"wrap"}
            m={"16px"}
          >
            <Text
              color={scssVariables.textGreyColor}
              fontWeight={500}
              fontSize={fontSizes.title}
            >
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
                  fontSize={fontSizes.parag}
                >
                  Хужжат кирувчи ракам ва санаси
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
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
                  fontSize={fontSizes.parag}
                >
                  Вилоят
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.districts?.region?.title || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Туман
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.districts?.title || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Юридик / Жисмоний Шахс
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.organization_type || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Мурожатчи
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.applicant || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Телефон Рақами
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.phone || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Мурожаат тури
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.application_type || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Йўналиш
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.sub_category_call_center?.title || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Тасниф
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.sub_category_call_center?.category_org?.title ||
                    "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Мурожаат шакли
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
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
                fontSize={fontSizes.parag}
              >
                Мурожаатнинг Қисқача Мазмуни
              </Text>
              <Divider my={"16px"} borderColor={"lightgrey"} />
              <Text
                color={scssVariables.textGreyColor}
                fontWeight={400}
                fontSize={fontSizes.span}
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
                  fontSize={fontSizes.parag}
                >
                  Ижрочи
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.performer || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Ижро Қилинган Сана
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.perform_date || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Тегишли Идораларга Юборилган
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.seded_to_Organization?.title || "Маълумот йўқ"}
                </Text>
              </Box>
              <Box>
                <Text
                  color={scssVariables.textGreyColor}
                  fontWeight={500}
                  fontSize={fontSizes.parag}
                >
                  Мурожаатни Жавоби
                </Text>
                <Text
                  color={scssVariables.textBlackColor}
                  fontWeight={400}
                  fontSize={fontSizes.span}
                >
                  {data[0]?.response === "null" && data[0]?.response
                    ? "Маълумот йўқ"
                    : data[0]?.response}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            leftIcon={<Download width={"16px"} height={"16px"} />}
            fontSize={fontSizes.parag}
            fontWeight={400}
            variant={"outline"}
            color={"orange.400"}
            borderColor={"orange.400"}
            _hover={{ bg: "orange.400", color: "white" }}
            onClick={handlePrint}
          >
            Чоп этиш
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
