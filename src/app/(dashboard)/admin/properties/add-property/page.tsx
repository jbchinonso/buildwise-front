import { BreadCrumbs, Button } from "@/components/ui";
import { AddPropertyForm } from "./AddPropertyForm";
import { getStates, getTitans } from "@/lib/services";
import { Plus } from "lucide-react";

const AddProperty = async () => {
  // const titans = await getTitans();
  // console.log({ titans });
  const states = await getStates();

  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="flex w-full justify-between flex-wrap items-center">
        <BreadCrumbs
          paths={[
            { title: "Home", path: "/admin/properties" },
            { title: "Add Property", path: "/admin/properties/add-property" },
          ]}
        />
      </div>

      <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full p-2">
        <header className="w-full text-grey-400 font-bold">
          <p>Add New Property</p>
        </header>

        <AddPropertyForm states={states} />
      </div>
    </section>
  );
};

export default AddProperty;
