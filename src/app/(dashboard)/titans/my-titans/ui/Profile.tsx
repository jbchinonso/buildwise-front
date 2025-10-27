import { Input } from "@/components/ui";
import { formatDate } from "@/lib/utils";

interface ITitanProfile {
  phone: string;
  email: string;
  state: string;
  lga: string;
  address: string;
  created_at: string;
}

const Profile = ({
  data = {
    phone: "",
    email: "",
    state: "",
    lga: "",
    address: "",
    created_at: "",
  },
}: {
  data?: ITitanProfile;
}) => {
  return (
    <section className="w-full flex flex-wrap justify-between gap-4 gap-x-20">
      <Input
        label="Phone number"
        type="text"
        readOnly
        // onClick={toggleModal}
        labelStyle="text-[#7A7F83]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
        defaultValue={data?.phone}
      />
      <Input
        label="Email address"
        defaultValue={data?.email}
        type="email"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />
      <Input
        label="Residential Address"
        type="text"
        defaultValue={data?.address}
        labelStyle="text-[#7A7F83]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />

      <Input
        label="Date Joined"
        type="text"
        defaultValue={formatDate(data?.created_at, "dd MMM yyyy")}
        readOnly
        labelStyle="text-[#7A7F83]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />
    </section>
  );
};

export default Profile;
