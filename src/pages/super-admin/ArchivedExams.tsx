import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Archive } from "lucide-react";

export default function ArchivedExams() {
  return (
    <PlaceholderPage
      title="Archived Exams"
      description="View all archived and completed exams."
      icon={<Archive size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
