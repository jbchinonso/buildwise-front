export const DashboardCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        "bg-white border-[0.5px] flex-[20%] flex-col max-h-[136px] h-full rounded-2xl"
      }
    >
      {children}
    </div>
  );
};
