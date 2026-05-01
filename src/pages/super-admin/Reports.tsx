import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Generate and download comprehensive reports."
      icon={<FileText size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
