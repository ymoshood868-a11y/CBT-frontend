import { PlaceholderPage } from "@/components/PlaceholderPage";
import { AlertTriangle } from "lucide-react";

export default function TabSwitches() {
  return (
    <PlaceholderPage
      title="Tab Switch Detection"
      description="Monitor and track tab switching violations during exams."
      icon={<AlertTriangle size={48} style={{ color: "hsl(var(--accent))" }} />}
    />
  );
}
