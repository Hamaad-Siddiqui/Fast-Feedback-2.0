import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import fetcher from "@/utils/fetcher";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteTable from "@/components/SiteTable";

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};
export default Dashboard;
