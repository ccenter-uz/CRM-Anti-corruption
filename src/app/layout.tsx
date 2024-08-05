import { ReactNode } from "react";
import "@/@core/application/style/global.css";
// style for toast
import "react-toastify/dist/ReactToastify.min.css";

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => children;

export default RootLayout;
