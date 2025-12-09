import { AdminSidebar, Header } from "@/components/dashboard";
import { HeaderServer } from "@/components/dashboard/Header.server";
import { NavProvider } from "@/lib/hooks/useNav";
import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") {
    return redirect("/login");
  }
  return (
    <NavProvider>
      <section className="flex flex-col flex-1 relative mb-auto w-full min-h-fit bg-[#F8F8F8] max-w-[MIN(2440px,100%)] mx-auto">
        <HeaderServer />

        <div className="w-full gap-4 flex flex-1 mb-8 max-h-[MIN(1920px,calc(100dvh-var(--scroll-padding)))] overflow-hidden">
          <AdminSidebar />
          <div className="w-full flex flex-col gap-6 flex-[80] py-2 px-4 overflow-auto">
            {children}
          </div>
        </div>
      </section>
    </NavProvider>
  );
}
