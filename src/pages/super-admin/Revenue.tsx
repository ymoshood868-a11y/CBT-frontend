import { PlaceholderPage } from "@/components/PlaceholderPage";
import { DollarSign } from "lucide-react";

export default function Revenue() {
  return (
    <PlaceholderPage
      title="Revenue Dashboard"
      description="Track revenue, earnings, and financial metrics."
      icon={<DollarSign size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
