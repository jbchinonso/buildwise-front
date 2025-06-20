"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export const Provider: React.FC<PropsWithChildren<{ session: any }>> = ({
  children,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
