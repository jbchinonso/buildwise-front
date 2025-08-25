import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { getAvailableProperties } from "@/lib/services";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";



export const AvaliableUnitsData = async () => {
  // const data = await getAvailableProperties();
  // console.log("available data::::", data);
  return (
    <div className="w-full my-1">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
};
