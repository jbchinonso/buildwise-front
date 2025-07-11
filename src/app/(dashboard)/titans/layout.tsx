import { Header, Sidebar } from "@/components/dashboard";
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
    <section className="flex flex-col flex-1 w-full min-h-full bg-[#F8F8F8] ">
      <Header />

      <div className="w-full gap-4 flex flex-1 mb-8  max-h-[calc(100dvh-var(--scroll-padding))] overflow-hidden">
        <Sidebar />
        <div className="w-full flex flex-col gap-6 flex-[80] py-2 px-4 overflow-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
