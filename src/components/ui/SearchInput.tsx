"use client";
import { Search } from "lucide-react";

export const SearchInput = () => {
  return (
    <div className="flex relative bg-white rounded-2xl">
      <Search size={12} className="top-1/2 -translate-y-1/2 left-2 absolute" />
      <input
        type="search"
        name="search"
        id="search"
        className="bg-white py-2 px-4 pl-6 text-xs rounded-2xl"
        placeholder="Search"
      />
    </div>
  );
};
