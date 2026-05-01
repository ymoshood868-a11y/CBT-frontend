import { PlaceholderPage } from "@/components/PlaceholderPage";
import { List } from "lucide-react";

export default function QuestionCategories() {
  return (
    <PlaceholderPage
      title="Question Categories"
      description="Manage question categories and subjects."
      icon={<List size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
