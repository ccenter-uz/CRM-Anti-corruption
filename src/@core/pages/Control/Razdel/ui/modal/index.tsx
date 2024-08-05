import { scssVariables } from "@/@core/application/utils/vars";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const ModalRazdel: FC<Props> = (props) => {
  const { onClose, isOpen, title, children } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader
          borderBottom={"1px solid lightgrey"}
          fontSize={scssVariables.fonts.parag}
          p={{
            base: "10px",
            sm: "10px",
            md: "16px",
            xl: "16px",
          }}
        >
          {title}
        </ModalHeader>
        <ModalBody
          p={{
            base: "10px",
            sm: "10px",
            md: "16px",
            xl: "16px",
          }}
        >
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
