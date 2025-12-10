import { AdminSidebar, Header } from "@/components/dashboard";
import { NavProvider } from "@/lib/hooks/useNav";
import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }
  return (
    <NavProvider>
      <section className="bg-[#F8F8F8] mb-auto flex-1 flex flex-col">
        {children}
      </section>
    </NavProvider>
  );
}
