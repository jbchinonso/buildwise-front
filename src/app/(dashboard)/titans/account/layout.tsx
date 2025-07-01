import React from "react";
import { AccountTabs } from "./ui";
import { ProfileAvatar } from "@/components/ui";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex items-start gap-4">
        <ProfileAvatar name={session?.user?.full_name || "User"} />

        <div className="flex flex-col">
          <p className="font-bold">{session?.user?.full_name || "User"}</p>
          <p className="text-xs text-[rgba(122,127,131,1)]">User ID: {session?.user?.id || "N/A"}</p>
        </div>
      </div>
      <AccountTabs />
      {children}
    </>
  );
};

export default AdminLayout;
