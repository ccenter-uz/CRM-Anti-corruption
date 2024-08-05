export const checkStatus = (status: string) => {
  switch (status) {
    case "update":
      return "Таҳрирланган";
    case "create":
      return "Яратилган";
    case "delete":
      return "Ўчирилган";
    default:
      return status;
  }
};
