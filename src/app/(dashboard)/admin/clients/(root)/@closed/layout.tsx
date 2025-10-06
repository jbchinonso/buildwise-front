export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "bg-white border-[0.5px] flex-[25%] flex-col f.lex-[25] max-h-[136px] m.ax-w-[MIN(251px,100%)] h-full rounded-2xl"
      }
    >
      {children}
    </div>
  );
}
