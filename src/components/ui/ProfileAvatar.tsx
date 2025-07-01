import { ClassArray } from "clsx";
import { cn, createAvatarUrl } from "@/lib/utils";
import Image from "next/image";
import { ClassNameValue } from "tailwind-merge";

interface AvatarProps {
  name: string;
  textColor?: string;
  background?: string;
  children?: React.ReactNode;
  img?: string;
  avatarClassName?: string;
  textClassName?: string;
  wrapperClassName?: string;
  avatarTextContainerClassName?: string;
  rounded?: boolean;
}

export const ProfileAvatar = (props: AvatarProps) => {
  const {
    img,
    name,
    background = "#03435f",
    textColor = "#FFF",
    avatarClassName,
    wrapperClassName,
    rounded,
  } = props;

  const cnFn = (...inputs: ClassArray) =>
    cn(
      "w-10 rounded-md aspect-square h-auto overflow-hidden",
      rounded && "rounded-full",
      inputs,
      avatarClassName
    );

  return (
    <div
      className={cn(
        "flex items-center rounded-full aspect-square gap-2 relative overflow-hidden",
        wrapperClassName
      )}
    >
      {img ? (
        <Image
          src={img}
          className={cnFn("rounded-full object-cover")}
          alt={name}
          width={100}
          height={100}
        />
      ) : (
        <div
          style={{
            backgroundImage: `url(${createAvatarUrl({
              avatarUrl: name,
              additionalParams: {
                background,
                color: textColor,
              },
            })})`,
          }}
          className={cnFn("bg-cover  rounded-full bg-center")}
        />
      )}
    </div>
  );
};

interface IProfileAvatar {
  className?: ClassNameValue;
  image?: string;
  name?: string;
  id?: string;
}

export const Avatar = ({ className, image, name, id }: IProfileAvatar) => {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <ProfileAvatar img={image} name={name || "User"} />

      <div className="flex flex-col">
        {name && <p className="font-semibold text-[#292A2C] text-xl">{name}</p>}
        {id && <span className="text-xs text-grey-400">User Id: {id}</span>}
      </div>
    </div>
  );
};
