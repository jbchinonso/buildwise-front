import { BreadCrumbs } from "@/components/ui";

type Params = Promise<{ client: string }>;

const PaymentHistoryPage = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.client;
  return (
    <section className="flex flex-1 flex-col gap-4">
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
    </section>
  );
};

export default PaymentHistoryPage;
