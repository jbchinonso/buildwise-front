import { PropertiesSold } from "../ui";
import { dashboardService } from "@/lib/services/dashboard.service";

const PropertiesChart = async () => {
  const { data } = await dashboardService.getDashboarSalesChart();
  return (
    <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white w-full flex-1 border border-grey-50">
      <div className="flex items-center justify-between p-4  w-full gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Properties sold</p>
          <span className="text-xs text-grey-400">Total: 0</span>
        </div>

        <div className="p-2 px-3 rounded-3xl bg-grey-50">
          <p className="text-xs">Last 1 year</p>
        </div>
      </div>
      <div className="flex flex-1 w-full my-4 p-1 overflow-x-auto">
        <PropertiesSold chartData={data} />
      </div>
    </div>
  );
};

export default PropertiesChart;
