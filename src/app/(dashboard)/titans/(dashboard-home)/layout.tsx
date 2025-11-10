export default function Layout({
  children,
  revenue,
  earnings,
  titans,
  clients,
}: {
  children: React.ReactNode;
  revenue: React.ReactNode;
  earnings: React.ReactNode;
  titans: React.ReactNode;
  clients: React.ReactNode;
}) {
  return (
    <>
      <section className="flex flex-wrap justify-between w-full gap-4 py-2">
        {revenue}
        {clients}
        {earnings}
        {titans}
      </section>
      {children}
    </>
  );
}
