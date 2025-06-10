import { AdminSidebar, Header } from "@/components/dashboard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col flex-1 w-full min-h-full bg-[#F8F8F8] ">
      <Header />

      <div className="w-full gap-4 flex flex-1 mb-8 max-h-[calc(100dvh-var(--scroll-padding))] overflow-hidden">
        <AdminSidebar />
        <div className="w-full flex flex-col gap-6 flex-[80] py-2 px-4 overflow-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
