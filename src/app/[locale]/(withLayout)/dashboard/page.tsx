import { redirect } from "next/navigation";

const DashboardHome = () => {
  redirect("/dashboard/requests");
};
export default DashboardHome;
