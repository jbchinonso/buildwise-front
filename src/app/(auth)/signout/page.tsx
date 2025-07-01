"use client";
import { signOut } from "next-auth/react";
import { permanentRedirect } from "next/navigation";
import { useEffect } from "react";

const SignOutPage = () => {
  useEffect(() => {
    signOut();
  }, []);

  permanentRedirect("/login");
};

export default SignOutPage;
