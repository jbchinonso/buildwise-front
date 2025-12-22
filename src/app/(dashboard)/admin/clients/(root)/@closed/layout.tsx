import { DashboardCardLayout } from "@/components/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardCardLayout>{children}</DashboardCardLayout>;
}
