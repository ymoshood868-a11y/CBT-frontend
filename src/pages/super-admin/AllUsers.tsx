import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Users } from "lucide-react";

export default function AllUsers() {
  return (
    <PlaceholderPage
      title="All Users"
      description="Manage all users across the platform including students, teachers, invigilators, and admins."
      icon={<Users size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
