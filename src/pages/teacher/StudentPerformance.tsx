import { PlaceholderPage } from "@/components/PlaceholderPage";
import { TrendingUp } from "lucide-react";

export default function StudentPerformance() {
  return (
    <PlaceholderPage
      title="Student Performance"
      description="Track student performance and progress."
      icon={<TrendingUp size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
