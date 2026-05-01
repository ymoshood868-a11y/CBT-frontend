import { PlaceholderPage } from "@/components/PlaceholderPage";
import { BookOpen } from "lucide-react";

export default function Teachers() {
  return (
    <PlaceholderPage
      title="Teachers"
      description="View and manage all teachers across all organizations."
      icon={<BookOpen size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
