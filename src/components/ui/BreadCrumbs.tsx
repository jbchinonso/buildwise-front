import Link from "next/link";

interface IBreadCrumbsPaths {
  title?: string;
  path: string;
}
export const BreadCrumbs = ({ paths }: { paths: IBreadCrumbsPaths[] }) => {
  return (
    <div className="flex w-full py-2">
      {paths.map((link, index, arr) =>
        index === arr.length - 1 ? (
          <p key={link.path} className="text-sm text-black">
            <span className={"font-semibold text-[#292A2C] p-1 px-2"}>
              {link?.title || link?.path}
            </span>
          </p>
        ) : (
          <Link
            key={link.path}
            href={link.path}
            className="text-sm group text-black "
          >
            <span className={"p-1 group-hover:underline px-2"}>
              {link?.title || link?.path}
            </span>
            {index !== arr.length - 1 && <span>/</span>}
          </Link>
        )
      )}
    </div>
  );
};
