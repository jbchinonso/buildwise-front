import Table from "./Table";

export const TopSellingProperties = ({ data }: { data: any[] }) => {
  return (
    <div className="rounded-2xl ma.x-w-[MIN(100%,601px)] bg-white p-4 w.-full flex-[40%] flex flex-col gap-4 border border-grey-50">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Top selling properties</p>
        </div>
      </div>

      <Table data={data} />
    </div>
  );
};
