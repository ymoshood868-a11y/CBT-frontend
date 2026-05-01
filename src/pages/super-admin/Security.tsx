import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ShieldAlert } from "lucide-react";

export default function Security() {
  return (
    <PlaceholderPage
      title="Security Center"
      description="Monitor security threats and manage security settings."
      icon={
        <ShieldAlert size={48} style={{ color: "hsl(var(--destructive))" }} />
      }
    />
  );
}
