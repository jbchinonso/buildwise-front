import { BreadCrumbs, Button, Input, ProfileAvatar } from "@/components/ui";
import { PayCommissionModal } from "./PayCommissionModal";
import { Clients, PropertiesSold, SubTitians } from "./tiles";

type Params = Promise<{ titan: string }>;
const TitanProfile = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.titan;

  const personalInformation = {
    phone_number: "070 3456 6543",
    email_address: "AnnetteBlack@gmail.com",
    residential_address: "2464 Royal Ln. Mesa, New Jersey 45463",
    bank_account: "First bank- 0838 3838 38",
    upline: "Ibrahim Sanogo",
    joined: "1 year 5 months ago",
    status: "Active",
  };

  const activities = {
    properties_sold: 4,
    clients: 3,
    sub_titans: 8,
    total_revenue: "₦17,000,000",
    sales_commission: "₦600,000",
    referral_commission: "₦67,000",
  };

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/titans" },
          { title: "All Titans", path: "/admin/titans/all" },
          { title: "Profile", path: "/admin/titans/:profile" },
        ]}
      />

      <div className="flex flex-col gap-8 flex-1 w-full gap max-w-[MIN(100%,1052px)]">
        <div className="flex w-full justify-between gap-4 flex-wrap items-center">
          <ProfileAvatar
            image="/image/avatar.png"
            name="Annette Black"
            id="0939393"
          />

          <div className="flex gap-4 items-center">
            <PayCommissionModal />

            <Button
              asLink
              href={`${id}/commission-history`}
              size="sm"
              variant="secondary"
              outline
            >
              Commission History
            </Button>
          </div>
        </div>

        {/* Profile info */}
        <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full">
          <header className="w-full text-grey-400 font-bold">
            <p>Personal Information</p>
          </header>

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
            label="Email address"
            name="email"
            id="email"
            type="email"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.email_address}
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
          <Input
            label="Bank account"
            name="bank_account"
            id="bank_account"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.bank_account}
          />
          <Input
            label="Upline"
            name="upline"
            id="upline"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.upline}
          />
          <Input
            label="Joined"
            name="joined"
            id="joined"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.joined}
          />
          <Input
            label="Status"
            name="status"
            id="status"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={personalInformation.status}
          />
        </div>
        {/* Activities info */}
        <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full">
          <header className="w-full text-grey-400 font-bold">
            <p>Activities</p>
          </header>

          <PropertiesSold
            data={activities.properties_sold}
            className="flex-[45%] max-w-[MIN(100%,470px)]"
          />

          <Clients
            data={activities.clients}
            className="flex-[45%] max-w-[MIN(100%,470px)]"
          />
          <SubTitians
            data={activities.sub_titans}
            className="flex-[45%] max-w-[MIN(100%,470px)]"
          />

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
          />

          <div className="w-full flex py-2 my-2">
            <Button
              variant="secondary"
              size="sm"
              className="text-error ml-auto"
            >{`Deactivate Agent's Account`}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitanProfile;
