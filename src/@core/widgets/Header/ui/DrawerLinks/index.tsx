import { adminlinks, userlinks } from "@/@core/application/helper/links";
import { useGlobal } from "@/@core/application/store/global";
import { scssVariables } from "@/@core/application/utils/vars";
import { useLang } from "@/@core/shared/hook/useLang";
import { DrawerUI } from "@/@core/shared/ui/Drawer";
import { Link, usePathname } from "@/navigation";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerLinks: FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const { locale } = useLang();
  const pathname = usePathname();
  const { role } = useGlobal();

  return (
    <DrawerUI isOpen={isOpen} onClose={onClose} title="LINKS">
      <Text
        color={"whitesmoke"}
        fontSize={{ base: "0", sm: "13px", md: "20px", xl: "20px" }}
        fontWeight={500}
        textAlign={"center"}
        mb={{ sm: "10px", md: "20px", xl: "20px" }}
      >
        Анти-коррупция
      </Text>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        borderTop={"1px solid rgba(255, 255, 255, 0.6)"}
        pt={"1em"}
      >
        {role === "admin"
          ? adminlinks.map((link) => (
              <Accordion key={link.id} allowToggle>
                <AccordionItem border={"none"}>
                  <AccordionButton
                    as={Link}
                    href={link.href}
                    p={"0.5em 0"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    fontSize={scssVariables.fonts.span}
                    className={`${
                      pathname == `/${locale}${link.href}` ? "active" : ""
                    }`}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Icon as={link.icon} w={"18px"} h={"18px"} />
                      <Text display={{ sm: "none", md: "flex", xl: "flex" }}>
                        {link.title}
                      </Text>
                    </Box>
                    {link.subMenu && <AccordionIcon />}
                  </AccordionButton>
                  {link.subMenu &&
                    link.subMenu.map((subLink) => (
                      <AccordionPanel
                        key={subLink.id}
                        p={"0"}
                        className={`${
                          pathname == `/${locale}${subLink.href}`
                            ? "active"
                            : ""
                        }`}
                      >
                        <AccordionButton
                          as={Link}
                          href={subLink.href}
                          onClick={() => onClose()}
                          fontSize={scssVariables.fonts.span}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <Icon as={subLink.icon} w={"12px"} h={"12px"} />
                            {subLink.title}
                          </Box>
                        </AccordionButton>
                      </AccordionPanel>
                    ))}
                </AccordionItem>
              </Accordion>
            ))
          : userlinks.map((link) => (
              <Accordion key={link.id} allowToggle>
                <AccordionItem border={"none"}>
                  <AccordionButton
                    as={Link}
                    href={link.href}
                    p={"0.5em 0"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    fontSize={scssVariables.fonts.span}
                    className={`${
                      pathname == `/${locale}${link.href}` ? "active" : ""
                    }`}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Icon as={link.icon} w={"18px"} h={"18px"} />
                      <Text display={{ sm: "none", md: "flex", xl: "flex" }}>
                        {link.title}
                      </Text>
                    </Box>
                    {link.subMenu && <AccordionIcon />}
                  </AccordionButton>
                  {link.subMenu &&
                    link.subMenu.map((subLink) => (
                      <AccordionPanel
                        key={subLink.id}
                        p={"0"}
                        className={`${
                          pathname == `/${locale}${subLink.href}`
                            ? "active"
                            : ""
                        }`}
                      >
                        <AccordionButton
                          as={Link}
                          href={subLink.href}
                          onClick={() => onClose()}
                          fontSize={scssVariables.fonts.span}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <Icon as={subLink.icon} w={"12px"} h={"12px"} />
                            {subLink.title}
                          </Box>
                        </AccordionButton>
                      </AccordionPanel>
                    ))}
                </AccordionItem>
              </Accordion>
            ))}
      </Box>
    </DrawerUI>
  );
};
