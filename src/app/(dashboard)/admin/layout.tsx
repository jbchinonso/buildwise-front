import { AdminSidebar, Header, Sidebar } from "@/components/dashboards";

export default function TitansLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col flex-1 w-full min-h-full bg-[#F8F8F8] px-8">
      <Header />

      <div className="w-full gap-6 flex flex-1 mb-8">
        <AdminSidebar />
        <div className="w-full flex flex-col gap-6 flex-[80]">{children}</div>
      </div>
    </section>
  );
}
