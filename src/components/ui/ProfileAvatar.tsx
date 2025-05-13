import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { ClassNameValue } from "tailwind-merge";

interface IProfileAvatar {
  className?: ClassNameValue;
  image?: string;
  name?: string;
  id?: string;
}

export const ProfileAvatar = ({
  className,
  image,
  name,
  id,
}: IProfileAvatar) => {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <div className="flex size-16 bg-grey-50 rounded-full aspect-square relative overflow-hidden">
        {image && <Image src={image} alt="Avatar" width={64} height={64} />}
      </div>

      <div className="flex flex-col">
        {name && <p className="font-semibold text-[#292A2C] text-xl">{name}</p>}
        {id && <span className="text-xs text-grey-400">User Id: {id}</span>}
      </div>
    </div>
  );
};
