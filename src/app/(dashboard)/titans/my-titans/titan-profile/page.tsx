import { CommissionsTable } from "@/app/(dashboard)/titans/titans/ui";
import { BreadCrumbs, Filters, SearchInput } from "@/components/ui";
import { getCommissions } from "@/lib/services";
import Profile from "../ui/Profile";
import Activities from "../ui/Activities";
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
          { title: "Titan profile", path: "/titans/my-titans/titan-profile" },
        ]}
      />

      <div className="flex flex-col gap-3 flex-1 w-full">
        <h2>Personal information</h2>
        <Profile/>
        <h2>Activities</h2>
        <Activities/>

      </div>
    </section>
  );
};

export default CommissionHistory;
