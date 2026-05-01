import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Brain } from "lucide-react";

export default function AIQuestionGenerator() {
  return (
    <PlaceholderPage
      title="AI Question Generator"
      description="Generate questions automatically using AI technology."
      icon={<Brain size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
