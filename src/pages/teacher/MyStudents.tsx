import { PlaceholderPage } from "@/components/PlaceholderPage";
import { GraduationCap } from "lucide-react";

export default function MyStudents() {
  return (
    <PlaceholderPage
      title="My Students"
      description="View and manage your students."
      icon={
        <GraduationCap size={48} style={{ color: "hsl(var(--primary))" }} />
      }
    />
  );
}
