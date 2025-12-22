import { Sidebar } from "@/components/dashboard";
import { HeaderServer } from "@/components/dashboard/Header.server";
import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TitansLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "titan") {
    return redirect("/login");
  }
  return (
    <section className="flex flex-col flex-1 relative mb-auto w-full min-h-fit bg-[#F8F8F8] max-w-[MIN(2440px,100%)] mx-auto">
      <HeaderServer />

      <div className="w-full gap-4 flex flex-1 mb-8  max-h-[MIN(calc(100dvh-var(--scroll-padding)),2000px)] overflow-hidden">
        <Sidebar />
        <div className="w-full flex flex-col gap-6 flex-[80] py-2 px-4 overflow-auto ">
          {children}
        </div>
      </div>
    </section>
  );
}
