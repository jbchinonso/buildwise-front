import { CommissionsTable } from "@/app/(dashboard)/titans/titans/ui";
import { BreadCrumbs, Filters, SearchInput } from "@/components/ui";
import { getCommissions } from "@/lib/services";
// import { CommissionsTable } from "../../../ui";

type Params = Promise<{ titan: string }>;

const CommissionHistory = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.titan;
  const { data = [] } = await getCommissions();

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/titans/my-titans/" },
          { title: "Commission breakdown", path: "/titans/my-titans/commission-breakdown" },
        ]}
      />

      <div className="flex flex-col gap-3 flex-1 w-full">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-[#292A2C] font-semibold ">
              My titans commission breakdown
            </h2>
            <Filters />
          </div>
          <div className="">
            <SearchInput />
          </div>
        </div>

        <CommissionsTable data={data} />
      </div>
    </section>
  );
};

export default CommissionHistory;
