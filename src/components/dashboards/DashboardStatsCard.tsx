export const DashboardStatsCard = ({
  title,
  icon,
  data,
  theme,
}: IDashboardStatsCardProps) => (
  <div className="bg-white cursor-pointer hover:scale-[1.01] duration-300 transition-all hover:bg-green-50/50 hover:border-primary-500 hover:shadow-sm border-[0.5px] border-grey-50 p-4 flex flex-col flex-[25] max-h-[136px] h-full rounded-2xl">
    <div className="flex gap-2 items-center">
      <span>{icon}</span>
      <span className="text-capitalize whitespace-nowrap text-grey-400 font-medium">{title}</span>
    </div>

    <h2 className="flex mx-auto my-auto py-8 text-grey-600 text-2xl font-medium">
      {data}
    </h2>
  </div>
);
