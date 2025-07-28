import { BreadCrumbs, Input } from "@/components/ui";
import { AddClientForm } from "./AddClientForm";
import { getTitans } from "@/lib/services";

const AddClient = async() => {
  const titans = await getTitans()
  console.log({titans})
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
         />
      </div>
    </section>
  );
};

export default AddClient;
