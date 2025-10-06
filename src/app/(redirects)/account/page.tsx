import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Account = async () => {
  const session = await getServerSession(authOptions);

  switch (session?.user?.role) {
    case "admin":
      redirect("/admin/account");
      break;
    case "titan":
      redirect("/titans/account");
      break;
    default:
      redirect("/login");
  }
};

export default Account;
