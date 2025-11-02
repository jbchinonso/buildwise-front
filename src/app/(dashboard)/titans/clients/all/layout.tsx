const AllClientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      {children}
    </section>
  );
};

export default AllClientsLayout;
