import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Upload } from "lucide-react";

export default function ImportExportQuestions() {
  return (
    <PlaceholderPage
      title="Import/Export Questions"
      description="Import questions from CSV/Excel or export existing questions."
      icon={<Upload size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
