import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  if (session) {
    permanentRedirect(`/`);
  }
  return (
    <section className="flex flex-1 w-full min-h-full it.ems-center bg-[#F8F8F8]">
      {children}
    </section>
  );
}
