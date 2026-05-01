import { PlaceholderPage } from "@/components/PlaceholderPage";
import { GraduationCap } from "lucide-react";

export default function Students() {
  return (
    <PlaceholderPage
      title="Students"
      description="View and manage all students across all organizations."
      icon={
        <GraduationCap size={48} style={{ color: "hsl(var(--primary))" }} />
      }
    />
  );
}
