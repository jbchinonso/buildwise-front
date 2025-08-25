import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

export default function Layout({
  children,
  overview,
  reserved,
  closed,
}: {
  children: React.ReactNode;
  overview: React.ReactNode;
  reserved: React.ReactNode;
  closed: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full justify-end items-center">
        <Button asLink href="clients/add-client" size="xs">
          <Plus color="currentColor" size={20} />
          Add new client
        </Button>
      </div>
      <section className="w-full justify-start flex flex-wrap gap-4">
        {overview}
        {reserved}
        {closed}
      </section>
      {children}
    </>
  );
}
