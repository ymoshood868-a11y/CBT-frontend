import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Trophy } from "lucide-react";

export default function Leaderboards() {
  return (
    <PlaceholderPage
      title="Leaderboards"
      description="View top performing students and organizations."
      icon={<Trophy size={48} style={{ color: "hsl(var(--accent))" }} />}
    />
  );
}
