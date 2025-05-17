import { BreadCrumbs } from "@/components/ui";
import { ActiveTabs, PaymentHistoryTable } from "../../../ui";

type Params = Promise<{ client: string }>;

const PaymentHistoryPage = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.client;

  return (
    <section className="flex flex-col flex-1 gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/clients" },
          { title: "All Clients", path: "/admin/clients/all" },
          { title: "Profile", path: `/admin/clients/all/${id}` },
          {
            title: "Payment history",
            path: "",
          },
        ]}
      />

      <section className="flex flex-col w-full gap-4 p-2">
        <p className="font-bold">Courtney Henry- Payment history</p>

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
