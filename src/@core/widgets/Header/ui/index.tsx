"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { ExternalLink, Menu, Search } from "react-feather";
import { FC } from "react";
import { useDisclosure } from "@/@core/shared/hook/useDisclosure";
import { DrawerLinks } from "./DrawerLinks";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {};

export const Header: FC<Props> = (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  // EXIT
  const handleLogout = () => {
    localStorage.clear();
    Cookie.remove("access_token");
    Cookie.remove("role");
    router.push("/signin");
  };

  return (
    <Box
      w="100%"
      bg={"#fff"}
      h={{ base: "50px", sm: "50px", md: "70px", xl: "70px" }}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.02)"
      display={"flex"}
      alignItems={"center"}
      justifyContent={{
        base: "center",
        sm: "flex-end",
        md: "flex-end",
        xl: "flex-end",
      }}
      p={{ base: "5px 10px", sm: "5px 10px", md: "8px 16px", xl: "8px 16px" }}
      fontSize={scssVariables.fonts.parag}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={{ base: "10px", sm: "10px", md: "20px", xl: "20px" }}
      >
        <Box
          className="burger-menu"
          display={{ base: "block", sm: "none", md: "none", xl: "none" }}
        >
          <Menu width={"20px"} height={"20px"} onClick={onOpen} />
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <InputGroup>
            <Input
              placeholder="Search"
              variant="outline"
              borderColor={"lightgrey"}
              fontSize={scssVariables.fonts.parag}
              p={{
                base: "5px 10px",
                sm: "5px 10px",
                md: "5px 10px",
                xl: "5px 10px",
              }}
              h={{ base: "30px", sm: "30px", md: "40px", xl: "40px" }}
              _focus={{
                borderColor: "teal",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02)",
              }}
            />
            <InputRightElement
              h={{ base: "30px", sm: "30px", md: "40px", xl: "40px" }}
              _hover={{
                cursor: "pointer",
                opacity: "0.7",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Search height={"20px"} width={"20px"} />
            </InputRightElement>
          </InputGroup>
          <Tooltip label="Чиқиш">
            <Button variant="outline" onClick={handleLogout}>
              <ExternalLink width={20} height={20} />
            </Button>
          </Tooltip>
        </Box>
      </Box>
      {/* DRAWER-LINKS */}
      <DrawerLinks isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
