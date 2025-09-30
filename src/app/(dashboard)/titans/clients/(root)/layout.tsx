export default function Layout({
  children,
  revenue,
  sales,
  properties,
  clients,
}: {
  children: React.ReactNode;
  revenue: React.ReactNode;
  sales: React.ReactNode;
  properties: React.ReactNode;
  clients: React.ReactNode;
}) {
  return (
    <>
      <section className="flex flex-wrap justify-between w-full gap-4 py-2">
        {clients}
        {properties}
        {revenue}
        {sales}
      </section>
      {children}
    </>
  );
}
