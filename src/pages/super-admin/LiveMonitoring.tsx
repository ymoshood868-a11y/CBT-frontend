import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Users } from "lucide-react";

export default function LiveMonitoring() {
  return (
    <PlaceholderPage
      title="Live Candidates"
      description="Monitor all candidates taking exams in real-time."
      icon={<Users size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
