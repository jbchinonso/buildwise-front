import { BreadCrumbs, Button, Input } from "@/components/ui";
import { getAllClients, getProperty } from "@/lib/services";
import { ActiveAgents, PropertyMenu, UnitsSold } from "../../ui";
import { UpdatePaymentModal } from "../../../clients/ui";
import { clientSelectDTO } from "@/lib/dtos";
import { ClientsOwnersModal } from "../../ui/ClientsOwnersModal";

type Params = Promise<{ property: string }>;
type SearchParams = Promise<{ page?: string; limit?: string; search?: string }>;

const Property = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = params.property;
  const page = searchParams.page || 1;
  const limit = searchParams.page || 10;
  const search = searchParams.search || "";

  const property = await getProperty(id);

  const [clients] = await Promise.all([getAllClients({ page, limit, search })]);
  const clientOptions = clientSelectDTO(clients?.data);

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/properties" },
          { title: "All Properties", path: "/admin/properties/all" },
          {
            title: property?.name || "Property",
            path: "/admin/properties/all/:property",
          },
        ]}
      />

      <div className="flex p-2 flex-col gap-8 flex-1 w-full gap max-w-[MIN(100%,1052px)]">
        <div className="flex w-full justify-between gap-4 flex-wrap items-center">
          <p className="font-bold text-xl">{property?.name || "Property"}</p>

          <div className="flex gap-4 items-center">
            <Button asLink href={`${id}/new-sale`} size="sm">
              Make Sales
            </Button>
            <UpdatePaymentModal clients={clientOptions} />
            <PropertyMenu property={property} />
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
            defaultValue={property?.priceOptions?.instantPrice || "N/A"}
          />
          <Input
            label="Payment options"
            name="priceOptions"
            id="priceOptions"
            type="text"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
            // defaultValue={property?.priceOptions as string}
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

          <UnitsSold id={property?._id} unitsSold={property?.soldUnits} />

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
            defaultValue={
              property?.createdAt
                ? new Date(property.createdAt).toLocaleString()
                : ""
            }
          />

          <ClientsOwnersModal owners={property?.owners || 0} />
          <ActiveAgents agents={property?.agents || 0} />

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
