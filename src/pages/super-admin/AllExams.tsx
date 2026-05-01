import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function AllExams() {
  return (
    <PlaceholderPage
      title="All Exams"
      description="View and manage all exams across all organizations."
      icon={<FileText size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
