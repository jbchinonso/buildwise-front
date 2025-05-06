export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-1 w-full min-h-full l bg-[#F8F8F8]">
      {children}
    </section>
  );
}
