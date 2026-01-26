import { BreadCrumbs } from "@/components/ui";
import {
  getClient,
  getTitanClientPaymentHistory
} from "@/lib/services";
import { clientProfileDTO } from "@/lib/dtos";
import { ActiveTabs, PaymentHistoryTable } from "@/components/dashboard";

type Params = Promise<{ client: string }>;
type SearchParams = Promise<{ property: string }>;

const PaymentHistoryPage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const clientId = params.client;
  const searchParams = await props.searchParams;
  const property = searchParams.property || "";

  const data = await getClient(clientId);

  const personalInformation = clientProfileDTO(data);

  const {
    sales = [],
    pagination,
    availableProperties = [],
  } = await getTitanClientPaymentHistory(clientId, property);

  return (
    <section className="flex flex-col flex-1 gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/clients" },
          { title: "All Clients", path: "/admin/clients/all" },
          { title: "Profile", path: `/admin/clients/all/${clientId}` },
          {
            title: "Payment history",
            path: "#",
          },
        ]}
      />

      <section className="flex flex-col w-full gap-4 p-2">
        <p className="font-bold capitalize">
          {personalInformation?.fullname} - Payment history
        </p>

        <div className="flex flex-col w-full gap-4">
          <ActiveTabs properties={availableProperties} />

          <div className="flex flex-col w-full">
            <PaymentHistoryTable data={sales || []} pagination={pagination} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default PaymentHistoryPage;
