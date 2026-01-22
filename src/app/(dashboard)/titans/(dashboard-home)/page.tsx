import { getTitanEarningsChart } from "@/lib/services";
import { convertToChartData } from "@/lib/dtos/earnings.dto";
import { EarningsOverviewChart } from "@/components/titans/dashboard";
import { toAmount } from "@/lib/utils";

const Dashboard = async () => {
  const res = await getTitanEarningsChart();
  const data = convertToChartData(res?.chartData) || [];

  return (
    <>
      {/* chart */}
      <div className="bg-white flex flex-col border-[0.5px] gap-4 p-4 w-full flex-1  max-h-fit rounded-2xl">
        <div className="w-full flex items-baseline justify-between">
          <p className="font-semibold text-xl text-[#292A2C]">
            Earning overview
          </p>
        </div>

        <div className="w-full flex h-full max-h-[300px]">
          <div className="flex py-4 mt-auto flex-col items-start gap-6 justify-start rounded-xl text-sm  text-white">
            <div className="flex gap-2 items-center">
              <span className="size-3  min-w-3 rounded-full bg-[#1FDBF4]" />
              <div className="flex flex-col">
                <p className="text-grey-400">Sales Commissions</p>
                <p className="text-grey-600 text-[10px]">
                  Yearly Total: {toAmount(res?.yearlyTotals?.sales ?? 0)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="size-3 min-w-3 rounded-full bg-[#9747FF]" />
              <div className="flex flex-col">
                <p className="text-grey-400">Commissions from Titans</p>
                <p className="text-grey-600 text-[10px]">
                  Yearly Total: {toAmount(res?.yearlyTotals?.titans ?? 0)}
                </p>
              </div>
            </div>
          </div>

          <EarningsOverviewChart chartData={data} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
