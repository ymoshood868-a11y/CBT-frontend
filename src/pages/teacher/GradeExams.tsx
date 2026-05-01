import { PlaceholderPage } from "@/components/PlaceholderPage";
import { CheckCircle } from "lucide-react";

export default function GradeExams() {
  return (
    <PlaceholderPage
      title="Grade Exams"
      description="Grade and review student exam submissions."
      icon={<CheckCircle size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
