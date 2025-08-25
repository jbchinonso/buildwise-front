import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

export default function Layout({
  children,
  listed,
  available,
  reserved,
  closed,
}: {
  children: React.ReactNode;
  listed: React.ReactNode;
  available: React.ReactNode;
  reserved: React.ReactNode;
  closed: React.ReactNode;
}) {
  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        {listed}
        {available}
        {reserved}
        {closed}
      </section>
      {children}
    </>
  );
}
