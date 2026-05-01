import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function DraftExams() {
  return (
    <PlaceholderPage
      title="Draft Exams"
      description="View and manage your draft exams."
      icon={<FileText size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
