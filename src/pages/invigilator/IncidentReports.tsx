import { PlaceholderPage } from "@/components/PlaceholderPage";
import { AlertTriangle } from "lucide-react";

export default function IncidentReports() {
  return (
    <PlaceholderPage
      title="Incident Reports"
      description="View and manage incident reports from exams."
      icon={<AlertTriangle size={48} style={{ color: "hsl(var(--accent))" }} />}
    />
  );
}
