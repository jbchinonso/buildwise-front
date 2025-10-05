import { BreadCrumbs } from "@/components/ui";
import React from "react";

const AllClientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/titans/clients" },
          { title: "All Clients", path: "/titans/clients/all" },
        ]}
      />

      <div>{children}</div>
    </section>
  );
};

export default AllClientsLayout;
