"use client";

import { useCallback, useState } from "react";

export const useDisclosure = () => {
  const [open, setOpen] = useState(false);

  //   OPEN
  const handleOpen = useCallback(() => setOpen(true), []);
  // CLOSE
  const handleClose = useCallback(() => setOpen(false), []);
  // TOGGLE
  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);

  return {
    isOpen: open,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  };
};
