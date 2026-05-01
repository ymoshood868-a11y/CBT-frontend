import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Play } from "lucide-react";

export default function ActiveExams() {
  return (
    <PlaceholderPage
      title="Active Exams"
      description="View currently active exams."
      icon={<Play size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
