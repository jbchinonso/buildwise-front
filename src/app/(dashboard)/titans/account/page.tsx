import { getTitanProfile } from "@/lib/services";
import ProfileForm from "./ProfileForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const profile = await getTitanProfile(session?.user?.id || "");
  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap gap-4 gap-x-20 w-full p-2">
        <ProfileForm profile={profile} />
      </div>
    </section>
  );
};

export default Profile;
