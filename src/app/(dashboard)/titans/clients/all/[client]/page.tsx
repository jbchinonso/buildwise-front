import { ClientProperties } from "@/components/dashboard";
import { BreadCrumbs, Button, Input, Avatar } from "@/components/ui";
import {
  getTitanClientProfile,
  getTitanClientProfileProperty,
} from "@/lib/services";

type Params = Promise<{ client: string; property: string }>;
type SearchParams = Promise<{ property: string }>;

const ClientProfile = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const id = params.client;

  const [profile, properties] = await Promise.all([
    getTitanClientProfile(id),
    getTitanClientProfileProperty(id),
  ]);

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/titans/clients" },
          { title: "All Clients", path: "/titans/clients/all" },
          { title: "Profile", path: "/titans/clients/:profile" },
        ]}
      />

      <div className="flex p-2 flex-col gap-8 flex-1 w-full gap max-w-[MIN(100%,1052px)]">
        <div className="flex w-full justify-between gap-4 flex-wrap items-center">
          <Avatar
            name={`${profile?.firstName || ""} ${profile?.lastName || ""}`}
          />

          <div className="flex gap-4 items-center">
            {/* <UpdatePaymentModal /> */}

            <Button
              asLink
              href={`${id}/payment-history`}
              size="sm"
              variant="secondary"
            >
              Payment History
            </Button>
          </div>
        </div>

        {/* Profile info */}
        <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full">
          <header className="w-full text-grey-400 font-bold">
            <p>Personal Information</p>
          </header>

          <Input
            label="First name"
            name="firstName"
            id="firstName"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={profile?.firstName}
          />
          <Input
            label="Last name"
            name="lastName"
            id="lastName"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={profile?.lastName}
          />

          <Input
            label="Phone number"
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={profile?.phoneNumber}
          />
          <Input
            label="Email Address"
            name="email"
            id="email"
            type="email"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={profile?.email}
          />
          <Input
            label="State"
            name="state"
            id="state"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={profile?.state}
          />
          <Input
            label="LGA"
            name="lga"
            id="lga"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={profile?.lga}
          />

          <Input
            label="Residential address"
            name="residentialAddress"
            id="residentialAddress"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={profile?.residentialAddress}
          />
        </div>

        {/* Activities info */}
        <ClientProperties properties={properties || []}  />
      </div>
    </section>
  );
};

export default ClientProfile;
