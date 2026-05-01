import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Clock } from "lucide-react";

export default function ScheduledExams() {
  return (
    <PlaceholderPage
      title="Scheduled Exams"
      description="View all upcoming scheduled exams."
      icon={<Clock size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
