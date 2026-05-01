import { PlaceholderPage } from "@/components/PlaceholderPage";
import { CheckCircle } from "lucide-react";

export default function ActiveExams() {
  return (
    <PlaceholderPage
      title="Active Exams"
      description="View all currently active exams."
      icon={<CheckCircle size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
