import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Flag } from "lucide-react";

export default function SuspiciousActivities() {
  return (
    <PlaceholderPage
      title="Suspicious Activities"
      description="View and manage flagged suspicious activities during exams."
      icon={<Flag size={48} style={{ color: "hsl(var(--destructive))" }} />}
    />
  );
}
