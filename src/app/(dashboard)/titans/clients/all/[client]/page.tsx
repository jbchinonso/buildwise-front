import { BreadCrumbs, Button, Input, Avatar } from "@/components/ui";
import {
  getTitanClientProfile,
  getTitanClientProfileProperty,
} from "@/lib/services";
import { IClientProperty } from "@/lib/type";
import { toAmount } from "@/lib/utils";

type Params = Promise<{ client: string; property: string }>;
type SearchParams = Promise<{ property: string }>;

const ClientProfile = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = params.client;
  const property = Number(searchParams?.property || 1);

  const [profile, properties] = await Promise.all([
    getTitanClientProfile(id),
    getTitanClientProfileProperty(id),
  ]);

  const selectedProperty = properties?.[property - 1];

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
        <div className="flex flex-1 flex-wrap justify-between gap-4 gap-x-20 w-full">
          <div className="w-fit rounded-full border p-2 flex gap-1 bg-[rgba(232,233,235,1)]">
            {(properties || [])?.map((v, i) => (
              <Button
                asLink
                href={`?property=${i + 1}`}
                replace={true}
                scroll={false}
                key={v?.propertyName + i}
                size="xs"
                className="!text-xs"
                variant={property == i + 1 ? "primary" : "secondary"}
              >
                Property {i + 1}
              </Button>
            ))}
          </div>

          <Properties property={selectedProperty} />
        </div>
      </div>
    </section>
  );
};

export default ClientProfile;

const Properties = ({ property }: { property: IClientProperty }) => {
  return (
    <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full">
      <Input
        label="State"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.state}
      />
      <Input
        label="Property"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.propertyName}
      />
      <Input
        label="Property Size"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.unitNumber}
      />
      <Input
        label="Property ID"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.plotNumber}
      />
      <Input
        label="Payment Plan"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.paymentPlan}
      />
      <Input
        label="Total paid"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={toAmount(property?.amountPaid || 0)}
      />
      <Input
        label="Outstanding payment"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={toAmount(property?.outstandingPayment || 0)}
      />
      <Input
        label="Payment due"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={toAmount(property?.paymentDue || 0)}
      />
    </div>
  );
};
