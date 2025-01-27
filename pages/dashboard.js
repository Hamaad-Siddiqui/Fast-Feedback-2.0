import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteTableHeader from "@/components/SiteTableHeader";
import EmptyState from "@/components/EmptyState";
import SiteTable from "@/components/SiteTable";
import fetcher from "@/utils/fetcher";

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};
export default Dashboard;
