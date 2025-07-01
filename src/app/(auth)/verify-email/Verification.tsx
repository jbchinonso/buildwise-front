"use client";
import { useEffect, useRef, useState } from "react";

import { Send2, TickCircle } from "iconsax-react";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getError } from "@/lib/utils";
import { Input, Logo, SubmitButton } from "@/components/ui";
import { resendVerificationEmail } from "@/lib/services";

export const Unverified = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  const timerId = useRef<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  const verificationAction = async () => {
    try {
      await resendVerificationEmail(email);
      toast.success(`Mail sent successfully!`);
      setCountdown(60);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    const handleInterval = () => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerId.current!);
        }
        return prevCount - 1;
      });
    };

    if (countdown > 0) {
      timerId.current = setInterval(handleInterval, 1000) as any;
    }

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [countdown]);

  if (session?.user.isEmailVerified) {
    // console.log({session})
    return <VerificationSuccessful />;
  }

  return (
    <section className="text-[#0B101B] top-0 left-0 w-full h-full  flex text-center flex-col gap-4 justify-center items-center">
      {countdown > 0 ? (
        <div className="flex flex-col flex-1 gap-4">
          <div className="max-w-[500px] rounded-full flex items-center justify-center bg-green-50 p-6">
            <Send2 size={100} color="oklch(72.3% 0.219 149.579)" />
          </div>
          <p className="text-xl font-bold lg:text-2xl">
            Check your mail!
            <br />
            <span className="my-1 text-sm font-normal">
              We sent a verification link to{" "}
              <span className="font-bold">{email}</span>
              <br />
            </span>
            <br />
            <></>
          </p>

          <p className="text-sm font-body">
            Didn&apos;t get a mail?{" "}
            {countdown > 0 ? (
              <>
                <span>Resend in </span>
                <span className="text-brand-blue"> {countdown} seconds</span>
              </>
            ) : null}
          </p>
        </div>
      ) : (
        <form
          action={verificationAction}
          className="flex flex-col gap-4  my-4 w-full max-w-[481px] min-w-[MIN(300px,70%)]"
        >
          <p className="my-4">
            Enter your email to resend email verification instruction.
          </p>
          <Input
            label="Email Address"
            name="email"
            id="email"
            value={email}
            type="email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <SubmitButton
            disabled={countdown > 0}
            className="mb-4 mx-auto min-w-full miin-w-[MIN(200px,70%)]"
          >
            Resend link
          </SubmitButton>
        </form>
      )}

      <Link className="font-medium hover:underline" href={"/login"}>Go back to Login</Link>
    </section>
  );
};

export const VerificationSuccessful = () => {
  const [countdown, setCountdown] = useState(15);
  const { data: session, update } = useSession();
  const timerId = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleInterval = () => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          update({ ...session?.user, isEmailVerified: true });
          clearInterval(timerId.current!);
          router.replace(session?.user ? "/dashboard" : "/login");
        }
        return prevCount - 1;
      });
    };

    if (countdown > 0) {
      timerId.current = setInterval(handleInterval, 1000) as any;
    }

    return () => {
      clearInterval(timerId.current!);
    };
  }, [countdown]);

  return (
    <section className="text-[#0B101B] fixed top-0 left-0 w-full h-full min-w-screen min-h-dvh px-[MIN(100px,8%)]  flex text-center flex-col gap-2 justify-center items-center">
      <Logo
        onClick={() => signOut()}
        className="absolute top-8 left-[MIN(50px,5%)]"
      />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex items-center justify-center rounded-full bg-green-50">
          <TickCircle
            size={100}
            className="text-green-400 text-9xl"
            variant="Bulk"
          />
        </div>
        <p className="text-xl font-bold lg:text-2xl lg:tracking-tight">
          Account verified successfully
        </p>

        <p className="text-[#8A8A8A] max-w-[500px]">
          You will be redirected in automatically{" "}
          <span className="font-bold">{countdown} secs. </span>
          If you&apos;re not redirected automatically,{" "}
          <Link
            replace
            href={session?.user ? "/dashboard" : "/login"}
            className="font-bold underline text-brand-blue"
          >
            click here
          </Link>
        </p>
      </div>
    </section>
  );
};
