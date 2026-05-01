import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ScrollText } from "lucide-react";

export default function ExamLogs() {
  return (
    <PlaceholderPage
      title="Exam Logs"
      description="View detailed logs of all exam activities."
      icon={<ScrollText size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
