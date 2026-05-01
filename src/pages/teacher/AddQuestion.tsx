import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileQuestion } from "lucide-react";

export default function AddQuestion() {
  return (
    <PlaceholderPage
      title="Add Question"
      description="Create new questions for your question bank."
      icon={<FileQuestion size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
