import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session?.user?.role == "admin") {
      return redirect("/admin");
    }
    if (session?.user?.role == "titan") {
      return redirect("/titans");
    }
  }
  return redirect("/login");
};

export default Dashboard;
