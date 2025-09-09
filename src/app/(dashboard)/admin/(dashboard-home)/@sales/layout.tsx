import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white w-full flex-1 border border-grey-50">
      {children}
    </div>
  );
}
