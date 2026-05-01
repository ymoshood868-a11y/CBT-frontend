import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function Invoices() {
  return (
    <PlaceholderPage
      title="Invoices"
      description="Manage and generate invoices for organizations."
      icon={<FileText size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
