export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "bg-white border-[0.5px] flex gap-4 p-4 divide-y flex-col w-full flex-1 max-h-[340px] h-full rounded-2xl overflow-y-auto"
      }
    >
      <p className="font-semibold text-lg text-[#292A2C] ">Recent Activities</p>

      <div className="flex w-full flex-1">{children}</div>
    </div>
  );
}
