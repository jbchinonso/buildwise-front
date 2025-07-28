import Link from "next/link";
import { Fragment } from "react";

interface IBreadCrumbsPaths {
  title?: string;
  path?: string;
}
export const BreadCrumbs = ({ paths }: { paths: IBreadCrumbsPaths[] }) => {
  return (
    <div className="flex justify-start items-center py-2">
      {paths.map((link, index, arr) => (
        <Fragment key={(link?.path || "") + index}>
          {index === arr.length - 1 ? (
            <p
              title={link?.title}
              className="text-sm text-black flex items-center"
            >
              <span
                className={
                  "font-semibold text-[#292A2C] max-w-[200px] overflow-hidden inline-block p-1 text-ellipsis whitespace-nowrap"
                }
              >
                {link?.title || link?.path}
              </span>
              <span></span>
            </p>
          ) : (
            <Link
              title={link?.title}
              href={link.path || "#"}
              className="text-sm group text-black flex items-center"
            >
              <span
                className={
                  "group-hover:underline max-w-[200px] p-1 px-2 overflow-hidden inline-block text-ellipsis whitespace-nowrap"
                }
              >
                {link?.title || link?.path}
              </span>
              {index !== arr.length - 1 && <span>/</span>}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
};
