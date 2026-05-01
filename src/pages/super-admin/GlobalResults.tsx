import { PlaceholderPage } from "@/components/PlaceholderPage";
import { TrendingUp } from "lucide-react";

export default function GlobalResults() {
  return (
    <PlaceholderPage
      title="Global Results"
      description="View results from all exams across all organizations."
      icon={<TrendingUp size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
