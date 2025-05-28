"use client";

import { ListFilter } from "lucide-react";

export const Filters = () => {
  return (
    <div className="flex relative ">
      <button className="flex relative bg-white outline outline-transparent hover:outline-primary rounded-2xl">
        <ListFilter
          size={12}
          className="top-1/2 -translate-y-1/2 left-2 absolute"
        />
        <p className="py-2 px-4 pl-6 text-xs text-grey-400">Filter</p>
      </button>


    </div>
  );
};
