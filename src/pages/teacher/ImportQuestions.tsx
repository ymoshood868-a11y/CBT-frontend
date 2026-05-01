import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Upload } from "lucide-react";

export default function ImportQuestions() {
  return (
    <PlaceholderPage
      title="Import Questions"
      description="Import questions from CSV or Excel files."
      icon={<Upload size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
