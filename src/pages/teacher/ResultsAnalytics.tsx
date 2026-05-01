import { PlaceholderPage } from "@/components/PlaceholderPage";
import { BarChart3 } from "lucide-react";

export default function ResultsAnalytics() {
  return (
    <PlaceholderPage
      title="Results Analytics"
      description="View detailed analytics of exam results."
      icon={<BarChart3 size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
