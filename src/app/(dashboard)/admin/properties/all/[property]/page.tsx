import { BreadCrumbs, Button, Input, ProfileAvatar } from "@/components/ui";
import { getProperty } from "@/lib/services";
import { clientProfileDTO } from "@/lib/dtos";
import { PropertyMenu } from "./ui";

type Params = Promise<{ property: string }>;

const Property = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.property;

  const property = await getProperty(id);

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/properties" },
          { title: "All Properties", path: "/admin/properties/all" },
          {
            title: property?.name || "Property",
            path: "/admin/properties/:property",
          },
        ]}
      />

      <div className="flex p-2 flex-col gap-8 flex-1 w-full gap max-w-[MIN(100%,1052px)]">
        <div className="flex w-full justify-between gap-4 flex-wrap items-center">
          <p className="font-bold text-xl">{property?.name || "Property"}</p>

          <div className="flex gap-4 items-center">
            {/* <UpdatePaymentModal /> */}

            <Button asLink href={`${id}/new-sale`} size="sm">
              Make Sales
            </Button>
            <Button
              asLink
              href={`${id}/payment-history`}
              size="sm"
              variant="secondary"
            >
              Update Payment
            </Button>
            <PropertyMenu />
          </div>
        </div>

        {/* Profile info */}
        <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full">
          <header className="w-full text-grey-400 font-bold">
            <p>Property information</p>
          </header>

          <Input
            label="State"
            name="state"
            id="state"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.state || "N/A"}
          />
          <Input
            label="LGA"
            name="lga"
            id="lga"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.lga || "N/A"}
          />

          <Input
            label="Address"
            name="address"
            id="address"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.address}
          />
          <Input
            label="Price"
            name="price"
            id="price"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.price || "N/A"}
          />
          <Input
            label="Payment options"
            name="priceOptions"
            id="priceOptions"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.priceOptions as string}
          />
          <Input
            label="Documents"
            name="documents"
            id="documents"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.documents}
          />

          <Input
            label="Units available"
            name="residential_address"
            id="residential_address"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.availableUnits}
          />
          <Input
            label="Units Sold/Reserved"
            name="soldUnits"
            id="soldUnits"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.soldUnits}
          />
          <Input
            label="Revenue generated"
            name="revenue"
            id="revenue"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.revenue}
          />
          <Input
            label="Outstanding payments"
            name="revenue"
            id="revenue"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.outstandingPayments}
          />
          <Input
            label="Date listed"
            name="createdAt"
            id="createdAt"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.createdAt}
          />
          <Input
            label="Clients/Ownerships"
            name="owners"
            id="owners"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.owners}
          />
          <Input
            label="Active agents"
            name="agents"
            id="agents"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.agents}
          />
          <Input
            label="Commission rate"
            name="saleCommissionRate"
            id="saleCommissionRate"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            defaultValue={property?.saleCommissionRate}
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
            {/* <AddPropertyModal /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Property;
