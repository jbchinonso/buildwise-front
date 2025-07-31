import { Avatar, BreadCrumbs, Button, Input, ProfileAvatar } from "@/components/ui";
import { UpdatePaymentModal, AddPropertyModal } from "../../ui";
import { getClient } from "@/lib/services";
import { clientProfileDTO } from "@/lib/dtos";
type Params = Promise<{ client: string }>;

const ClientProfile = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.client;

  
  
  const data = await getClient(id);
  
  const personalInformation = clientProfileDTO(data)
  
  console.log({data, personalInformation})
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
            <UpdatePaymentModal />

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
        <div className="flex flex-1 flex-wrap justify-between gap-4 gap-x-20 w-full">
          {/* <header className="w-full text-grey-400 font-bold">
            <p>Activities</p>
          </header>

          <Input
            label="Total revenue"
            name="total_revenue"
            id="total_revenue"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={activities.total_revenue}
          />
          <Input
            label="Sales commission"
            name="sales_commission"
            id="sales_commission"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={activities.sales_commission}
          />
          <Input
            label="Referral commission"
            name="referral_commission"
            id="referral_commission"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={activities.referral_commission}
          /> */}

          <div className="w-full flex py-2 my-2 mt-auto">
            <AddPropertyModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientProfile;
