import { CommissionsTable } from "@/app/(dashboard)/titans/titans/ui";
import {
  BreadCrumbs,
  Filters,
  ProfileAvatar,
  SearchInput,
} from "@/components/ui";
import { getCommissions } from "@/lib/services";
import Profile from "../ui/Profile";
import Activities from "../ui/Activities";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

type Params = Promise<{ titan: string }>;

const CommissionHistory = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.titan;
  const { data = [] } = await getCommissions();
  const session = await getServerSession(authOptions);
  return (
    <section className="flex flex-1 flex-col">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/titans/my-titans/" },
          { title: "Titan profile", path: "/titans/my-titans/titan-profile" },
        ]}
      />

      <div className="flex flex-col flex-1 w-full gap-4">
        <div className="flex items-start gap-4 mt-5 mx-3">
          <ProfileAvatar name={session?.user?.full_name || "User"} />

          <div className="flex flex-col">
            <p className="font-bold">{session?.user?.full_name || "User"}</p>
            <p className="text-xs text-[rgba(122,127,131,1)]">
              User ID: {session?.user?.id || "N/A"}
            </p>
          </div>
        </div>
        <h2 className="text-[rgba(122,127,131,1)] text-[16px] font-medium">Personal information</h2>
        <Profile />
        <h2 className="text-[rgba(122,127,131,1)] text-[16px] font-medium">Activities</h2>
        <Activities />
      </div>
    </section>
  );
};

export default CommissionHistory;
