"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitButton } from "./Buttons";
import { useEffect, useState } from "react";

export const SearchInput = ({
  showSubmit = true,
}: {
  showSubmit?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const defaultSearch = searchParams.get("search") || "";

  const onSubmit = () => {
    if (search) {
      const params = new URLSearchParams();
      params.set("search", encodeURIComponent(search));
      router.replace(`?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (defaultSearch) {
      setSearch(defaultSearch);
    }
  }, [defaultSearch]);

  useEffect(() => {
    if (!search) {
      const params = new URLSearchParams();
      params.delete("search");
      router.replace(`?${params.toString()}`);
    }
  }, [search]);

  return (
    <form action={onSubmit} className="flex relative rounded-2xl">
      <Search size={12} className="top-1/2 -translate-y-1/2 left-2 absolute" />
      <input
        type="search"
        name="search"
        id="search"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        autoComplete="off"
        className="bg-white py-2 px-4 pl-6 text-xs rounded-2xl peer  "
        placeholder="Search"
      />
      {search && showSubmit && (
        <SubmitButton
          disabled={search === defaultSearch}
          variant="primary"
          size="xs"
          className="py-0 mx-1 !text-[10px]"
        >
          Search
        </SubmitButton>
      )}
    </form>
  );
};
