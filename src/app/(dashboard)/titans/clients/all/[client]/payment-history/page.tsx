import { BreadCrumbs } from "@/components/ui";
import { ActiveTabs, PaymentHistoryTable } from "../../../ui";
import {
  getTitanClientPaymentHistory,
  getTitanClientProfile,
} from "@/lib/services";

type Params = Promise<{ client: string }>;
type SearchParams = Promise<{ property: string }>;

const PaymentHistoryPage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = params.client;

  const [profile, { allTransactions = [], properties = [] }] =
    await Promise.all([
      getTitanClientProfile(id),
      getTitanClientPaymentHistory(id),
    ]);

  const filteredTransactions = searchParams?.property
    ? allTransactions?.filter((v) => v?.propertyId === searchParams?.property)
    : allTransactions;

  return (
    <section className="flex flex-col flex-1 gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/titans/clients" },
          { title: "All Clients", path: "/titans/clients/all" },
          { title: "Profile", path: `/titans/clients/all/${id}` },
          {
            title: "Payment history",
            path: "",
          },
        ]}
      />

      <section className="flex flex-col w-full gap-4 p-2">
        <p className="font-bold">
          {`${profile?.firstName || ""} ${profile?.lastName || ""}`} - Payment
          history
        </p>

        <div className="flex flex-col w-full gap-4">
          <ActiveTabs properties={properties} />

          <div className="flex flex-col w-full">
            <PaymentHistoryTable data={filteredTransactions} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default PaymentHistoryPage;
