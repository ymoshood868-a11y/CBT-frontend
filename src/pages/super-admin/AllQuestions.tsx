import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileQuestion } from "lucide-react";

export default function AllQuestions() {
  return (
    <PlaceholderPage
      title="All Questions"
      description="Browse and manage all questions in the question bank."
      icon={<FileQuestion size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
