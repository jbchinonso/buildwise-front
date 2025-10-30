const AllClientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <div>{children}</div>
    </section>
  );
};

export default AllClientsLayout;
