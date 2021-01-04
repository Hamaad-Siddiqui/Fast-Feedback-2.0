import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import EmptyState from "@/components/EmptyState";
import FeedbackTable from "@/components/FeedbackTable";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";

const Feedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/feedback", user.token] : null, fetcher);
  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};
export default Feedback;
