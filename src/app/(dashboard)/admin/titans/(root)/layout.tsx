import { TitanStatsTable } from "../ui/TitanStatsTable";

export default async function Layout({
  children,
  stats,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
}) {
  return (
    <>
      <section className="w-full justify-start flex flex-wrap gap-4">
        {stats}
      </section>
      {children}

      {/* <TitanStatsTable /> */}
    </>
  );
}
