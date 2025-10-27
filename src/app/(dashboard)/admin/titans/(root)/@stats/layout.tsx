export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full justify-between flex flex-wrap gap-4">
      {children}
    </section>
  );
}
