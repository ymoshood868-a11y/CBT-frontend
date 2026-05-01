import { PlaceholderPage } from "@/components/PlaceholderPage";
import { UserCog } from "lucide-react";

export default function Admins() {
  return (
    <PlaceholderPage
      title="Organization Admins"
      description="View and manage all organization administrators."
      icon={<UserCog size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
