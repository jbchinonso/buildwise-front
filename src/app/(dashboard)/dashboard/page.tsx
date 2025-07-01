import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session });

  switch (session?.user?.role) {
    case "admin":
      redirect("/admin");
      break;
    case "titan":
      redirect("/titans");
      break;
    default:
      redirect("/login");
  }
};

export default Dashboard;
