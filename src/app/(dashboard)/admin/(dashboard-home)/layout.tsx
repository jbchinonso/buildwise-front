export default async function Layout({
  children,
  stats,
  sales,
  properties,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
  sales: React.ReactNode;
  properties: React.ReactNode;
}) {
  return (
    <>
      <section className="flex flex-wrap justify-between w-full gap-4 py-2">
        {stats}
      </section>
      <section className="flex flex-wrap gap-4 mb-4">
        {sales}
        {properties}
      </section>
      <div>{children}</div>
    </>
  );
}
