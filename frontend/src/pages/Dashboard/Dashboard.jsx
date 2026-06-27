import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";

import { Page, PageHeader } from "../../components/ui/Page";
import { Card } from "../../components/ui/Card";
import Icon from "../../components/ui/Icon";
import Skeleton from "../../components/ui/Skeleton";
import Reveal from "../../components/ui/Reveal";
import { useCountUp } from "../../hooks/useCountUp";

const StatCard = ({ icon, label, value, suffix = "", decimals = 0 }) => {
  // Count up numeric values; strings (e.g. a disease name) pass through.
  const display = useCountUp(value, { decimals });

  return (
    <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      {/* Soft glow that blooms on hover. */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-200/0 blur-2xl transition-all duration-500 group-hover:bg-brand-200/50"
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-300 group-hover:scale-110">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <h2 className="text-sm font-medium text-neutral-500">{label}</h2>
      </div>
      <p className="relative mt-4 text-3xl font-bold tracking-tight text-neutral-900 tabular-nums">
        {display}
        {suffix}
      </p>
    </Card>
  );
};

const StatSkeleton = () => (
  <Card className="p-6">
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="h-4 w-28" />
    </div>
    <Skeleton className="mt-4 h-9 w-20" />
  </Card>
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const result = await getDashboardData(1);
        if (mounted) setData(result);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page width="xl">
      <PageHeader
        eyebrow="Overview"
        title="Analytics dashboard"
        description="A snapshot of your detection activity and model performance."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!data ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            <Reveal>
              <StatCard
                icon="layers"
                label="Total Predictions"
                value={data.total_predictions}
              />
            </Reveal>
            <Reveal delay={120}>
              <StatCard
                icon="microscope"
                label="Most Detected Disease"
                value={data.most_detected_disease}
              />
            </Reveal>
            <Reveal delay={240}>
              <StatCard
                icon="trendingUp"
                label="Average Confidence"
                value={data.average_confidence}
                suffix="%"
              />
            </Reveal>
          </>
        )}
      </div>
    </Page>
  );
};

export default Dashboard;
