import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Eye } from "lucide-react";

export default function Invigilators() {
  return (
    <PlaceholderPage
      title="Invigilators"
      description="View and manage all invigilators across all organizations."
      icon={<Eye size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
