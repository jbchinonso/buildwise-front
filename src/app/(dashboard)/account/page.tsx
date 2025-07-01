import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Account = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session?.user?.role == "user") {
      return redirect("/admin/account");
    }
    return redirect("/titans/account");
    // return redirect("/admin");
  } else {
    return redirect("/login");
  }
};

export default Account;
