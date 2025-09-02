import { BreadCrumbs } from "@/components/ui";
import { getAllClients, getProperty, getTitans } from "@/lib/services";
import { NewSaleForm } from "./NewSaleForm";
import { clientSelectDTO } from "@/lib/dtos";
import { ITitans } from "@/lib/type";

type Params = Promise<{ property: string }>;
type SearchParams = Promise<{ page?: string; limit?: string; search?: string }>;

const NewSale = async (props: {
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

  const [clients, titans] = await Promise.all([
    getAllClients({ page, limit, search }),
    getTitans({ page, limit, search }),
  ]);

  const clientOptions = clientSelectDTO(clients?.data);

  const titanOptions = (titans?.data || [])?.map((v: ITitans) => ({
    label: v?.titan,
    value: v?.id,
  }));

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/properties" },
          { title: "All Properties", path: "/admin/properties/all" },
          {
            title: property?.name || "Property",
            path: `/admin/properties/all/${id}`,
          },
          {
            title: "New sales",
          },
        ]}
      />
      <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full p-2">
        <header className="w-full text-grey-400 font-bold">
          <p>New Sales</p>
        </header>

        <NewSaleForm
          property={{
            _id: property?._id,
            priceOptions: property?.priceOptions,
            name: property?.name,
            price: property?.price,
          }}
          clients={clientOptions}
          agents={titanOptions}
        />
      </div>
    </section>
  );
};

export default NewSale;
