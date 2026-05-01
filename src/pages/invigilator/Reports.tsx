import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <PlaceholderPage
      title="Exam Reports"
      description="View and generate exam monitoring reports."
      icon={<FileText size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
