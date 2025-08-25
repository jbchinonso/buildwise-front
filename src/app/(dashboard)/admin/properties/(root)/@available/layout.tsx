import CardLoading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "bg-white border-[0.5px] flex flex-col flex-[25] max-h-[136px] max-w-[MIN(251px,100%)] h-full rounded-2xl"
      }
    >
      {children}
    </div>
  );
}
