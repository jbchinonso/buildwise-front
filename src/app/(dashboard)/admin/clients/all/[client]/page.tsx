import { Avatar, BreadCrumbs, Button, Input } from "@/components/ui";
import { UpdatePaymentModal } from "../../ui";
import { getClient, getTitanClientProfileProperty } from "@/lib/services";
import { clientProfileDTO } from "@/lib/dtos";
import { AddPropertyModal, ClientProperties } from "@/components/dashboard";

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

  const [data, properties] = await Promise.all([
    getClient(id),
    getTitanClientProfileProperty(id),
  ]);

  const personalInformation = clientProfileDTO(data);

  const propertyOptions = (properties || [])?.map((property, index) => ({
    label: `${property?.propertyName} - ${property?.unitNumber}`,
    value: String(property?.id || index),
  }));

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/clients" },
          { title: "All Clients", path: "/admin/clients/all" },
          { title: "Profile", path: "/admin/clients/:profile" },
        ]}
      />

      <div className="flex p-2 flex-col gap-8 flex-1 w-full gap max-w-[MIN(100%,1052px)]">
        <div className="flex w-full justify-between gap-4 flex-wrap items-center">
          <Avatar name={personalInformation?.fullname} />

          <div className="flex gap-4 items-center">
            <UpdatePaymentModal properties={propertyOptions || []} />

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
            defaultValue={personalInformation.firstName}
          />
          <Input
            label="Last name"
            name="lastName"
            id="lastName"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.lastName}
          />

          <Input
            label="Phone number"
            name="phone_number"
            id="phone_number"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.phone_number}
          />
          <Input
            label="Email Address"
            name="email"
            id="email"
            type="email"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.email}
          />
          <Input
            label="State"
            name="state"
            id="state"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.state}
          />
          <Input
            label="LGA"
            name="lga"
            id="lga"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.lga}
          />

          <Input
            label="Residential address"
            name="residential_address"
            id="residential_address"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.residential_address}
          />
        </div>

        {/* Activities info */}
        {properties?.length ? (
          <ClientProperties properties={properties || []} property={property} />
        ) : (
          <div className="flex flex-1 flex-wrap justify-between gap-4 gap-x-20 w-full">
            <div className="w-full flex py-2 my-2 mt-auto">
              <AddPropertyModal />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientProfile;
