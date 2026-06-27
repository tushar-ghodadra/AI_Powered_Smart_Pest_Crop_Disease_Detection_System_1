import { useEffect, useState } from "react";
import { getHistory } from "../../services/historyService";

import { Page, PageHeader } from "../../components/ui/Page";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Icon from "../../components/ui/Icon";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import AnimatedBar from "../../components/ui/AnimatedBar";

const columns = ["ID", "Type", "Prediction", "Confidence", "Model", "Date"];

const ConfidenceCell = ({ value }) => {
  const n = Number(value);
  const color =
    n >= 80 ? "bg-emerald-500" : n >= 50 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-16">
        <AnimatedBar
          value={value}
          className="h-1.5"
          barClassName={color}
          label={`Confidence ${value}%`}
        />
      </div>
      <span className="tabular-nums text-sm font-medium text-neutral-700">
        {value}%
      </span>
    </div>
  );
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getHistory(1);

        if (mounted) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page width="xl">
      <PageHeader
        eyebrow="Activity"
        title="Prediction history"
        description="A complete log of your past pest and disease detections."
        action={
          !loading &&
          history.length > 0 && (
            <Badge tone="neutral">
              {history.length} {history.length === 1 ? "record" : "records"}
            </Badge>
          )
        }
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-neutral-500"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={col} className="px-5 py-4">
                        <Skeleton className="h-4 w-full max-w-[120px]" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : history.length > 0 ? (
                history.map((item, index) => {
                  const isPest = item.prediction_type === "pest";
                  return (
                    <tr
                      key={item.prediction_id}
                      className="animate-rise transition-colors duration-150 hover:bg-neutral-50/80"
                      style={{
                        animationDelay: `${Math.min(index, 12) * 45}ms`,
                      }}
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-neutral-400">
                        #{item.prediction_id}
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          tone={isPest ? "warning" : "brand"}
                          icon={
                            <Icon
                              name={isPest ? "bug" : "leaf"}
                              className="h-3.5 w-3.5"
                            />
                          }
                        >
                          <span className="capitalize">
                            {item.prediction_type}
                          </span>
                        </Badge>
                      </td>
                      <td className="px-5 py-4 font-medium text-neutral-900">
                        {item.class_name}
                      </td>
                      <td className="px-5 py-4">
                        <ConfidenceCell value={item.confidence} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-neutral-600">
                        {item.model_name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-neutral-500">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length}>
                    <EmptyState
                      icon="history"
                      title="No prediction history yet"
                      description="Once you run a detection, your results will appear here."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
};

export default History;
