import { Header, Sidebar } from "@/components/dashboard";
import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TitansLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <section className="flex flex-col flex-1 w-full min-h-full bg-[#F8F8F8] px-8">
      <Header />

      <div className="w-full gap-4 flex flex-1 mb-8">
        <Sidebar />
        <div className="w-full flex flex-[80] bg-[#F8F8F8]">{children}</div>
      </div>
    </section>
  );
}
