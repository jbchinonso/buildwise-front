import { BreadCrumbs } from "@/components/ui";
import { ActiveTabs, PaymentHistoryTable } from "../../../ui";
import { getClient, getClientPaymentData } from "@/lib/services";
import { clientProfileDTO } from "@/lib/dtos";

type Params = Promise<{ client: string }>;

const PaymentHistoryPage = async (props: { params: Params }) => {
  const params = await props.params;
  const clientId = params.client;
  const data = await getClient(clientId);

  const personalInformation = clientProfileDTO(data);

  // const paymentData = await getClientPaymentData({ clientId });

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
        <p className="font-bold">{personalInformation?.fullname} - Payment history</p>

        <div className="flex flex-col w-full gap-4">
          <ActiveTabs />

          <div className="flex flex-col w-full">
            <PaymentHistoryTable data={[]} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default PaymentHistoryPage;
