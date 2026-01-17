export default function Layout({
  children,
  revenue,
  earnings,
  titans,
  clients,
  activities,
}: {
  children: React.ReactNode;
  revenue: React.ReactNode;
  earnings: React.ReactNode;
  titans: React.ReactNode;
  clients: React.ReactNode;
  activities: React.ReactNode;
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

      <section className="flex flex-col flex-1">{activities}</section>
    </>
  );
}
