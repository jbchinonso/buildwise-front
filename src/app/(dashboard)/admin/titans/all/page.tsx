import { getTitans, getTransactions } from "@/lib/services";
import AllTitansTable from "./AllTitansTable";
import { BreadCrumbs } from "@/components/ui";

const AllTitansPage = async () => {
  const { data = [] } = await getTitans();
  // console.log({data})
  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/titans" },
          { title: "All Titans", path: "/admin/titans/all" },
        ]}
      />

      <div className="flex flex-col flex-1 w-full gap-4">
        <div className="flex w-full justify-between mb-4">
          <h2 className="font-semibold">All Titans 86</h2>

          <div className="flex">
            <div className="flex rounded-full bg-white">
              <input
                type="search"
                placeholder="Search"
                className="rounded-full text-sm p-1 px-4"
              />
            </div>
          </div>
        </div>

        <AllTitansTable data={data} />
      </div>
    </section>
  );
};

export default AllTitansPage;
