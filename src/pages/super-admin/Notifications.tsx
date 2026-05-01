import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Bell } from "lucide-react";

export default function Notifications() {
  return (
    <PlaceholderPage
      title="Notification Center"
      description="Manage system notifications and alerts."
      icon={<Bell size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
