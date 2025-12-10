import { toAmount } from "@/lib/utils";
import { RevenueChart } from "../ui";
import { getDashboarRevenueChart } from "@/lib/services/dashboard.service";

const SalesChart = async () => {
  const { data: chartData, total } = await getDashboarRevenueChart();
  return (
    <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white w-full flex-1 border border-grey-50">
      <div className="flex items-center justify-between p-4  w-full gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Revenue</p>
          <span className="text-xs text-grey-400">
            Total: {toAmount(total || 0)}
          </span>
        </div>

        <div className="p-2 px-3 rounded-3xl bg-grey-50">
          <p className="text-xs">Last 1 year</p>
        </div>
      </div>
      <div className="flex flex-1 w-full my-4 p-1 overflow-x-auto">
        <RevenueChart chartData={chartData} />
      </div>
    </div>
  );
};

export default SalesChart;
