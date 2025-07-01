import React from "react";
import { Unverified, VerificationSuccessful } from "./Verification";
import { verifyEmail } from "@/lib/services";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const VerifyEmail = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const token = searchParams["token"];

  if (token) {
    const data = await verifyEmail(token as string);

    if (data) {
      return <VerificationSuccessful />;
    }
  }

  return <Unverified />;
};

export default VerifyEmail;
