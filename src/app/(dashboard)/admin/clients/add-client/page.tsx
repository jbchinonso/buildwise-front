import { BreadCrumbs, Input } from "@/components/ui";
import { AddClientForm } from "./AddClientForm";
import { getStates, getTitans } from "@/lib/services";

const AddClient = async () => {
  const [agents, states] = await Promise.all([getTitans(), getStates()]);


  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/clients" },
          { title: "Add Client", path: "/admin/clients/add-client" },
        ]}
      />
      <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full p-2">
        <header className="w-full text-grey-400 font-bold">
          <p>Enter your client information</p>
        </header>

        <AddClientForm
          agents={agents?.map((v: any) => ({
            label: v?.fullname,
            value: v?._id,
          }))}
          states={states}
        />
      </div>
    </section>
  );
};

export default AddClient;
