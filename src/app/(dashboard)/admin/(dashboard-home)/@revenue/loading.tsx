import { Skeleton } from "@/components/ui";

const Loading = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center animate-pulse justify-between p-4  w-full gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Revenue</p>
          <span className="text-xs text-grey-400">Total: ₦0</span>
        </div>

        <div className="p-2 px-3 rounded-3xl bg-grey-50">
          <p className="text-xs">Last 1 year</p>
        </div>
      </div>

      <Skeleton className="h-60" />
    </div>
  );
};

export default Loading;
