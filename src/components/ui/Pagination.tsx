"use client";

import { IPaginationResponse } from "@/lib/type";
import { Button } from "./Buttons";
import { ClassNameValue } from "tailwind-merge";
import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface IPaginationProps extends IPaginationResponse {
  className?: ClassNameValue;
  scroll?: boolean;
  replace?: boolean;
}

export const Pagination = ({
  className = "",
  scroll = true,
  replace = false,
  total,
  hasNextPage,
  hasPreviousPage,
  limit,
  page,
  pages,
  totalPages,
}: IPaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page") || 0);

  const pagination = useMemo(() => {
    const _total = Number(total || 1);
    const _pages = Math.max(
      Math.floor(_total / Number(limit)) || Number(totalPages || pages || 1),
      1
    );

    return { total: _total, pages: _pages };
  }, [limit, pages, total, totalPages]);

  const handlePage = useCallback(
    (page: string | number = "") => {
      const url = new URLSearchParams(searchParams);
      if (!page) {
        url.delete("page");
      } else {
        url.set("page", `${Number(page || 1)}`);
      }

      if (replace) {
        router.replace(`?${url.toString()}`, { scroll });
      } else {
        router.push(`?${url.toString()}`, { scroll });
      }
    },
    [searchParams, replace, router, scroll]
  );

  if (pagination.pages === 1) return;

  return (
    <div className="flex my-4">
      {Array.from({ length: pagination.pages }).map((_, index) => {
        const page = index + 1;
        const key = `page-${index + 1}`;
        const isActive = Number(currentPage) === page;
        return (
          <Button
            key={key}
            size="xs"
            variant="round"
            outline
            onClick={() => handlePage(page)}
            className={cn({ "bg-primary-500 text-white": isActive })}
            // disabled={!table.getCanPreviousPage()}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};
