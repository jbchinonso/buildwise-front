import { BreadCrumbs } from "@/components/ui";
import { AddPropertyForm } from "./AddPropertyForm";
import { getTitans } from "@/lib/services";

const AddProperty = async () => {
  // const titans = await getTitans();
  // console.log({ titans });
  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/properties" },
          { title: "Add Property", path: "/admin/properties/add-property" },
        ]}
      />
      <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full p-2">
        <header className="w-full text-grey-400 font-bold">
          <p>Add New Property</p>
        </header>

        <AddPropertyForm />
      </div>
    </section>
  );
};

export default AddProperty;
