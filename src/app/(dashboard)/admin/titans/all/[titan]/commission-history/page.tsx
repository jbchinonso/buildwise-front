import { BreadCrumbs } from "@/components/ui";
import { getCommissions } from "@/lib/services";
import { CommissionsTable } from "./CommissionsTable";


type Params = Promise<{ titan: string }>;

const CommissionHistory = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.titan;
  const { data = [] } = await getCommissions();

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/titans" },
          { title: "All Titans", path: "/admin/titans/all" },
          { title: "Profile", path: `/admin/titans/${id}` },
          {
            title: "Commission history",
            path: `/admin/titans/:profile/Commission history`,
          },
        ]}
      />

      <div className="flex flex-col gap-8 flex-1 w-full">
        <CommissionsTable data={data} />
      </div>
    </section>
  );
};

export default CommissionHistory;
