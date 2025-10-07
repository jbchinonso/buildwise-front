export default function Layout({
  children,
  revenue,
  sales,
  titans,
  clients,
}: {
  children: React.ReactNode;
  revenue: React.ReactNode;
  sales: React.ReactNode;
  titans: React.ReactNode;
  clients: React.ReactNode;
}) {
  return (
    <>
      <section className="flex flex-wrap justify-between w-full gap-4 py-2">
        {revenue}
        {sales}
        {titans}
        {clients}
      </section>
      {children}
    </>
  );
}
