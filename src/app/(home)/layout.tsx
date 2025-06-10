
import { Navbar, Footer } from "@/components/home";
import { NavProvider } from "@/lib/hooks/useNav";


const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavProvider>
      <Navbar />
      <main className="flex flex-1 bg-red-400 min-h-[calc(100dvh-200px)] flex-col leading-tight items-center justify-between  w-full">
        {children}
      </main>
      <Footer />
    </NavProvider>
  );
};

export default LandingPageLayout;
