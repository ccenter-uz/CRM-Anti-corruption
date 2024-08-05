import { Header } from "@/@core/widgets/Header";
import { Sidebar } from "@/@core/widgets/Sidebar";
import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const withLayout = ({ children }: { children: React.ReactNode }) => {
  if (!cookies().has("access_token")) return redirect("/signin");

  return (
    <Box display={"flex"} className="wrapper">
      <Sidebar />
      <Box w={"100%"} h={"100%"} overflowY={"scroll"}>
        <Header />
        {children}
      </Box>
    </Box>
  );
};

export default withLayout;
